import React from "react";
import { Link } from "react-router-dom";
import { stringify } from "query-string";

export default ({ page, range, previous, next, query, totalPages }) => (
  <section className="page">
    <button disabled={page <= 1 || page > totalPages} onClick={previous}>
      Previous
    </button>
    <div className="page-number">
      {range.map(
        rangePage =>
          rangePage === page ? (
            <h3 key={rangePage}>{page}</h3>
          ) : (
            <Link
              to={{
                pathname: "/",
                search: `?${stringify({ query, page: rangePage })}`
              }}
              key={rangePage}
            >
              {rangePage}
            </Link>
          )
      )}
    </div>
    <button disabled={page >= totalPages || page < 1} onClick={next}>
      Next
    </button>
  </section>
);
