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
            <p key={i}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : ""}
            </p>
          ));
          const userData = users.map((user) => (
            <React.Fragment key={user.id}>
              <p>{user.name}</p>
              <small>{user.email}</small>
            </React.Fragment>
          ));
          return (
            <>
              <h3>Favorited ({favoritedCount}) </h3>
              <h3>Categories:</h3> {uniqueCategories}
              <h3>Users:</h3> {userData}
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
