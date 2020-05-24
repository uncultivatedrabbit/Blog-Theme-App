import React, { Component } from "react";
import { BlogContext } from "../../lib/BlogContext";
import { Link } from "react-router-dom";

export default class BlogThemeTile extends Component {
  static contextType = BlogContext;
  
  //toggles the favorited icon for themes
  handleToggle(theme) {
    const favorited = !theme.favorited;
    const updatedTheme = {
      ...theme,
      favorited: favorited,
    };
    // update the theme in the database to reflect favorite/unfavorite
    const url = "http://localhost:8000/api/blogThemes";
    const headers = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTheme),
      redirect: "follow",
    };
    fetch(url, headers)
      .then((res) => res.text())
      .then(() => this.context.toggleFavorite(updatedTheme));
  }

  // handles rendering the tiles based off user needs / specifications
  renderBlogTiles = () => {
    return (
      <BlogContext.Consumer>
        {(context) => {
          let filteredThemes, renderedThemes;
          const {
            blogThemes,
            userFilterCategory,
            userSortType,
            manualFilter,
          } = context;
          //real time filtering of themes
          if (manualFilter) {
            renderedThemes = blogThemes.filter((theme) =>
              theme.type.toLowerCase().includes(manualFilter.toLowerCase())
            );
          } else {
            // checks if user wanted specific type of themes
            if (!userFilterCategory) {
              filteredThemes = blogThemes;
            } else {
              filteredThemes = blogThemes.filter(
                (theme) =>
                  theme.type.toLowerCase() === userFilterCategory.toLowerCase()
              );
            }
            // switch statement to account for different ways user wants to sort the data
            switch (userSortType) {
              case "alpha":
                renderedThemes = filteredThemes.sort((a, b) => {
                  const nameA = a.name.toLowerCase();
                  const nameB = b.name.toLowerCase();
                  return nameA > nameB ? 1 : -1;
                });
                break;
              case "omega":
                renderedThemes = filteredThemes.sort((a, b) => {
                  const nameA = a.name.toLowerCase();
                  const nameB = b.name.toLowerCase();
                  return nameA < nameB ? 1 : -1;
                });
                break;
              case "favorited":
                renderedThemes = filteredThemes.sort((a, b) => {
                  const isFavoritedA = a.favorited;
                  return isFavoritedA ? -1 : 1;
                });
                break;
              default:
                renderedThemes = filteredThemes;
            }
          }
          // render the themes to the UI after filtering and sorting
          return renderedThemes.map((theme) => (
            // renders list of tiles based on available themes
            <li className="blog-tile" key={theme.id}>
              <div className="tile-header">
                {theme.name
                  ? theme.name.charAt(0).toUpperCase() + theme.name.slice(1)
                  : ""}
                {/* // checks if the theme is favorited or not  */}
                {theme.favorited ? (
                  <i
                    onClick={() => this.handleToggle(theme)}
                    className="favorite fas fa-heart"></i>
                ) : (
                  <i
                    onClick={() => this.handleToggle(theme)}
                    className="favorite far fa-heart"></i>
                )}
              </div>
              <img src={`${theme.imageUrl}/200/300`} alt={theme.name} />
              <p>
                Style:{" "}
                {theme.type
                  ? theme.type.charAt(0).toUpperCase() + theme.type.slice(1)
                  : ""}
              </p>
              <Link className="theme-btn" to={`/theme/${theme.id}`}>
                Learn More
              </Link>
            </li>
          ));
        }}
      </BlogContext.Consumer>
    );
  };

  render() {
    return <>{this.renderBlogTiles()}</>;
  }
}
