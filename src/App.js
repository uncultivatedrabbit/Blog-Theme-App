import React, { Component } from "react";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import "./App.css";
import { BlogContext } from "./lib/BlogContext";
import update from "react-addons-update";

class App extends Component {
  state = {
    user: "",
    blogThemes: [],
    errorMessage: "",
    userFilterCategory: "",
    userSortType: "",
    manualFilter: "",
  };

  //fetch the user and themes from the database
  getDataFromApi = () => {
    const blogThemesUrl = "http://localhost:8000/api/blogThemes";
    const userUrl = "http://localhost:8000/api/user";
    Promise.all([fetch(blogThemesUrl), fetch(userUrl)])
      .then(async ([blogThemesRes, userRes]) => {
        if (!blogThemesRes.ok) {
          const e_1 = await blogThemesRes.json();
          return await Promise.reject(e_1);
        }
        if (!userRes.ok) {
          const e_2 = await userRes.json();
          return await Promise.reject(e_2);
        }
        return Promise.all([blogThemesRes.json(), userRes.json()]);
      })
      .then(([blogThemes, user]) => {
        // update state with the folders and notes
        // from the database
        this.setState({ blogThemes, user });
      })
      .catch((err) =>
        this.setState({
          errorMessage: "Sorry. Something went wrong with the connection.",
        })
      );
  };

  componentDidMount() {
    this.getDataFromApi();
  }

  // handles the filter category dropdown
  handleUserFilter = (category) => {
    this.setState({
      userFilterCategory: category,
    });
  };
  // handles the sort methods the user can use
  // e.g. alphabetic or favorite first
  handleUserSort = (sortType) => {
    this.setState({
      userSortType: sortType,
    });
  };

  // handles real time filtering of themes
  handleRealTimeFilter = (query) => {
    this.setState({
      manualFilter: query,
    });
  };

  //handles toggling the favorited icon to fav and un-fav themes
  handleToggleFavorite = (toggledTheme) => {
    const toggledThemeIndex = this.state.blogThemes.findIndex(
      (theme) => theme.id === toggledTheme.id
    );
    // replaces the specific theme in state with the updated theme with toggled favorite
    this.setState(
      update(this.state, {
        blogThemes: {
          [toggledThemeIndex]: {
            $set: toggledTheme,
          },
        },
      })
    );
  };

  render() {
    const {
      user,
      blogThemes,
      userFilterCategory,
      userSortType,
      manualFilter,
    } = this.state;
    const value = {
      user,
      blogThemes,
      userFilterCategory,
      userSortType,
      manualFilter,
      toggleFavorite: this.handleToggleFavorite,
      userFilter: this.handleUserFilter,
      sortBy: this.handleUserSort,
      realTimeFilter: this.handleRealTimeFilter,
    };
    return (
      <BlogContext.Provider value={value}>
        <div className="container">
          <Navbar />
          {this.state.errorMessage ? (
            <>
              <h2 className="error-msg">{this.state.errorMessage}</h2>
            </>
          ) : (
            <MainPage />
          )}
        </div>
      </BlogContext.Provider>
    );
  }
}

export default App;
