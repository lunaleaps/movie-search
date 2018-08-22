import React, { Component } from "react";
import { stringify, parse } from "query-string";
import Search from "../components/Search";
import Results from "../components/Results";
import Page from "../components/Page";
import NoResults from "../components/NoResults";
import getRange from "../lib/getRange";

import { defaultState } from "../state";
const BASE = "https://api.themoviedb.org/3";
const API_KEY = "e0cbc086ed14d108014b4c1f2dcd433d";

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.getConfiguration();
    const params = parse(this.props.location.search);
    if (params.query && params.page > 0) {
      this.search(params.query, params.page);
    }
  }

  componentDidUpdate(prevProps) {
    const prevParams = parse(prevProps.location.search);
    const params = parse(this.props.location.search);

    if (prevParams.query !== params.query || prevParams.page !== params.page) {
      if (params.query && params.page > 0) {
        this.search(params.query, params.page);
      } else {
        this.setState(state => ({ ...state, query: "" }));
      }
    }
  }

  getConfiguration = async () => {
    const params = stringify({
      api_key: API_KEY
    });
    const url = `${BASE}/configuration?${params}`;
    const request = new Request(url);
    try {
      const response = await fetch(request);
      const jsonResponse = await response.json();
      this.setState(state => ({
        ...state,
        config: jsonResponse.images
      }));
    } catch (e) {
      window.alert("Something went wrong");
      console.error(e);
    }
  };

  search = async (query, page = 1) => {
    const { results } = this.state;
    const key = `${query}:${page}`;
    if (results[key]) {
      return;
    }

    const params = stringify({
      query,
      page,
      api_key: API_KEY
    });

    const url = `${BASE}/search/movie?${params}`;
    const request = new Request(url);
    try {
      const response = await fetch(request);
      const jsonResponse = await response.json();

      const { results, total_pages, total_results } = jsonResponse;
      this.setState(state => ({
        ...state,
        query,
        totalPages: total_pages,
        totalResults: total_results,
        results: { ...state.results, [key]: results }
      }));
    } catch (e) {
      console.error(e);
      window.alert("Something went wrong");
      // try again logic here
    }
  };

  onQueryChange = event => {
    const value = event.target.value;
    this.setState(state => ({ ...state, query: value }));
  };

  onSearchSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const { history, location } = this.props;
    const { query } = this.state;
    const params = stringify({ query, page: 1 });
    history.push(`${location.pathname}?${params}`);
  };

  previous = () => {
    const { history, location } = this.props;
    const params = parse(location.search);
    const { query, page: strPage } = params;
    const page = parseInt(strPage, 10);
    if (page <= 1) return;
    const nextParams = stringify({ query, page: page - 1 });
    history.push(`${location.pathname}?${nextParams}`);
  };

  next = () => {
    const { history, location } = this.props;
    const { totalPages } = this.state;
    const params = parse(location.search);
    const { query, page: strPage } = params;

    const page = parseInt(strPage, 10);
    if (page === totalPages) return;
    const nextParams = stringify({ query, page: page + 1 });
    history.push(`${location.pathname}?${nextParams}`);
  };

  render() {
    const { location } = this.props;
    const {
      query: displayQuery,
      results,
      config,
      totalPages,
      totalResults
    } = this.state;
    const { query = "", page: strPage } = parse(location.search);
    const page = strPage ? parseInt(strPage, 10) : 0;
    const key = `${query}:${page}`;

    const pageResults = results[key];
    const posterBase =
      config !== null
        ? `${config.secure_base_url}/${config.poster_sizes[0]}`
        : "";
    const range = getRange(page, totalPages);

    return (
      <main>
        <Search
          query={displayQuery}
          onQueryChange={this.onQueryChange}
          onSearchSubmit={this.onSearchSubmit}
        />
        {page !== 0 && page <= totalPages && totalResults > 0 ? (
          <Page
            query={query}
            page={page}
            totalPages={totalPages}
            previous={this.previous}
            next={this.next}
            range={range}
          />
        ) : null}
        {pageResults && pageResults.length > 0 ? (
          <Results results={pageResults} posterBase={posterBase} />
        ) : (
          <NoResults />
        )}
        {page !== 0 && page <= totalPages && totalResults > 0 ? (
          <Page
            query={query}
            page={page}
            totalPages={totalPages}
            previous={this.previous}
            next={this.next}
            range={range}
          />
        ) : null}
      </main>
    );
  }
}

export default MovieSearch;
