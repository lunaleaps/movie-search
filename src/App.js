import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieSearch from "./views/MovieSearch";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h2>Movie Search</h2>
          </header>
          <Route>
            {({ history, location }) => (
              <MovieSearch history={history} location={location} />
            )}
          </Route>
        </div>
      </Router>
    );
  }
}

export default App;
