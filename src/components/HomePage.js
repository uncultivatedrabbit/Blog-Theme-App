import React from "react";
import BlogThemeTiles from "./subcomponents/BlogThemeTiles";

export default function HomePage() {
  return (
    <div>
      <h2 className="tiles-title">Available Themes:</h2>
      <ul className="blog-tiles">
        <BlogThemeTiles />
      </ul>
    </div>
  );
}
