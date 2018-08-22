import React from "react";
import Result from "./Result";

export default ({ results, posterBase }) => (
  <section className="results">
    {results.map(result => (
      <Result key={result.id} posterBase={posterBase} {...result} />
    ))}
  </section>
);
