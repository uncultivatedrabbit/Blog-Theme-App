import React, { Component } from "react";
import { BlogContext } from "../lib/BlogContext";

export default class Sidebar extends Component {
  state = {
    searchCategory: "",
    manualSearchQuery: "",
  };

  static contextType = BlogContext;

  // manages the dropdown user sort
  handleSearchQuery = (e) => {
    e.preventDefault();
    const category = e.target.categories.value;
    this.setState(
      {
        searchCategory: category,
      },
      () => this.context.userFilter(this.state.searchCategory)
    );
  };

  // handles real time filter of options by user
  handleManualSearch = (e) => {
    const manualSearch = e.target.value;
    this.setState({
      manualSearchQuery: manualSearch
    }, () => this.context.realTimeFilter(this.state.manualSearchQuery))
  };

  // renders sidebar content
  renderSidebarContent = () => {
    return (
      <BlogContext.Consumer>
        {(context) => {
          const { blogThemes, user } = context;
          // get count of how many themes have been favorited
          const favoritedCount = blogThemes.filter((theme) => theme.favorited)
            .length;
          let types = [];
          blogThemes.forEach((theme) => {
            types.push(theme.type);
          });
          const uniqueCategories = [...new Set(types)].map((type, i) => (
            <option key={i} value={type}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
            </option>
          ));
          return (
            <>
              <h3>Favorited ({favoritedCount}) </h3>
              <div className="category-container">
                <h3>Categories:</h3>{" "}
                <form
                  id="category-form"
                  onSubmit={(e) => this.handleSearchQuery(e)}>
                  <select name="categories" id="categories">
                    <option value="">All</option>
                    {uniqueCategories}
                  </select>
                  <button className="theme-btn btn" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div className="filter-container">
                <h3>Search for theme type:</h3>
                <input
                  id="filter-input"
                  type="text"
                  placeholder="retail"
                  onChange={(e) => this.handleManualSearch(e)}></input>
              </div>
              <hr className="big-break" />
              <div className="user-section">
                <img
                  src="/images/headshot.jpg"
                  className="profile"
                  alt={user.name}
                />
                <div className="user-info">
                  <p className="user-name">{user.name}</p>
                  {user.isSuperUser ? <p className="pill">Super User</p> : ""}
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
            </>
          );
        }}
      </BlogContext.Consumer>
    );
  };
  render() {
    return <aside id="sidebar">{this.renderSidebarContent()}</aside>;
  }
}
