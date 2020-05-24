import React, { Component } from "react";
import { BlogContext } from "../../BlogContext";
import { Link } from "react-router-dom";

export default class BlogThemeTile extends Component {
  static contextType = BlogContext;

  handleToggle(theme) {
    const favorited = !theme.favorited;
    const updatedTheme = {
      ...theme,
      favorited: favorited,
    };
    // const url = "http://localhost:8000/api/blogThemes";
    // const headers = {
    //   method: "PUT",
    //   body: JSON.stringify(updatedTheme),
    //   header: {
    //     "content-type": "application/json",
    //   },
    // };
    // fetch(url, headers)
    //   .then((res) => res.text())
    // .then(() =>
    this.context.toggleFavorite(updatedTheme);
    // );
  }
  renderBlogTiles = () => {
    return (
      <BlogContext.Consumer>
        {(context) =>
          context.blogThemes.map((theme) => (
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
                    className="fas fa-heart"></i>
                ) : (
                  <i
                    onClick={() => this.handleToggle(theme)}
                    className="far fa-heart"></i>
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
          ))
        }
      </BlogContext.Consumer>
    );
  };

  render() {
    return <>{this.renderBlogTiles()}</>;
  }
}
