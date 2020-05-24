import React, { Component } from "react";
import { BlogContext } from "../BlogContext";
import { Link } from "react-router-dom";

export default class ProductPage extends Component {
  renderThemeInfo = (params) => {
    return (
      <BlogContext.Consumer>
        {(context) => {
          const { blogThemes } = context;
          const blogTheme =
            blogThemes.find((theme) => {
              return theme.id === params.id;
            }) || {};
          return (
            <div className="theme-info">
              <div className="theme-heading">
                <h2>{blogTheme.name}</h2>
                <img
                  src={`${blogTheme.imageUrl}/400/500`}
                  alt={blogTheme.name}
                />
              </div>
              <div className="theme-about">
                <p>{blogTheme.about}</p>
              </div>
            </div>
          );
        }}
      </BlogContext.Consumer>
    );
  };
  render() {
    const params = this.props.match.params;
    return (
      <div>
        <Link className="back-btn" to="/">
          <i className="fas fa-angle-left"></i>
          Back
        </Link>
        {this.renderThemeInfo(params)}
      </div>
    );
  }
}
