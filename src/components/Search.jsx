import React from "react";
import searchIcon from "../search_icon.svg";

export default ({ query, onQueryChange, onSearchSubmit }) => (
  <section className="search">
    <form onSubmit={onSearchSubmit}>
      <img className="search-icon" src={searchIcon} alt="search icon" />
      <label className="hide" htmlFor="search">
        Search
      </label>
      <input
        name="search"
        type="text"
        onChange={onQueryChange}
        value={query}
        placeholder="Search for a movie..."
      />
      <button>Search</button>
    </form>
  </section>
);
