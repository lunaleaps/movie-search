import React from "react";

export default ({
  original_title,
  posterBase,
  poster_path,
  overview,
  release_date
}) => (
  <article>
    {poster_path ? (
      <img className="poster" src={`${posterBase}/${poster_path}`} />
    ) : (
      <div className="poster" />
    )}
    <div className="details">
      <h2>{original_title}</h2>
      {release_date ? <h4>{release_date}</h4> : null}
      <p>{overview}</p>
    </div>
  </article>
);
