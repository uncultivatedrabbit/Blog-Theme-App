import React, { Component } from "react";
import { BlogContext } from "../BlogContext";

export default class Sidebar extends Component {
  renderSidebarContent = () => {
    return (
      <BlogContext.Consumer>
        {(context) => {
          const { users, blogThemes } = context;
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
          // const userData = users.map((user) => (
          //   <React.Fragment key={user.id}>
          //     <p>{user.name}</p>
          //     <small>{user.email}</small>
          //   </React.Fragment>
          // ));
          return (
            <>
              <h3>Favorited ({favoritedCount}) </h3>
              <div className="category-container">
                <h3>Categories:</h3>{" "}
                <select name="categories" id="categories">
                  {uniqueCategories}
                </select>
              </div>
              <div className="filter-container">
                <h3>Search for theme type:</h3>
                <input id="filter-input" type="text" placeholder="retail"></input>
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
