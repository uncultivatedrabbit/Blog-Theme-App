import React, { Component } from "react";
import BlogThemeTiles from "./BlogThemeTiles";
import { BlogContext } from "../../lib/BlogContext";

export default class HomePage extends Component {
  state = {
    userSortedBy: "",
  };

  static contextType = BlogContext;

  handleUserSort = (e) => {
    const userSortReq = e.target.value;
    this.setState({
      userSortedBy: userSortReq,
    });
    this.context.sortBy(userSortReq);
  };
  render() {
    return (
      <div>
        <hr className="mobile-break"/>
        <div className="tiles-header-container">
          <h2 className="tiles-title">Available Themes:</h2>
          <form id="sortByForm">
            <label className="label" htmlFor="sortChoices">Sort:</label>
            <select
              onChange={(e) => this.handleUserSort(e)}
              name="sortChoices"
              id="sortChoices">
              <option value="">-----</option>
              <option value="alpha">A-Z</option>
              <option value="omega">Z-A</option>
              <option value="favorited">Favorited</option>
            </select>
          </form>
        </div>
        <ul className="blog-tiles">
          <BlogThemeTiles />
        </ul>
      </div>
    );
  }
}
