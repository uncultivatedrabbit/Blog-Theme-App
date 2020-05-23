import React, { Component } from "react";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import "./App.css";
import { BlogContext } from "./BlogContext";

class App extends Component {
  state = {
    users: [],
    blogThemes: [],
    errorMessage: "",
  };

  getDataFromApi = () => {
    const usersUrl = "http://localhost:8000/api/users";
    const blogThemesUrl = "http://localhost:8000/api/blogThemes";

    Promise.all([fetch(usersUrl), fetch(blogThemesUrl)])
      .then(async ([usersRes, blogThemesRes]) => {
        if (!usersRes.ok) {
          const e = await usersRes.json();
          return await Promise.reject(e);
        }
        if (!blogThemesRes.ok) {
          const e_1 = await blogThemesRes.json();
          return await Promise.reject(e_1);
        }
        return Promise.all([usersRes.json(), blogThemesRes.json()]);
      })
      .then(([users, blogThemes]) => {
        // update state with the folders and notes
        // from the database
        this.setState({ users, blogThemes });
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

  handleAddUser = () => {};

  handleDeleteUser = () => {};

  // handleToggleFavorite = (toggledTheme) => {
  //   const toggledThemeIndex = this.state.blogThemes.findIndex(theme => theme.id === toggledTheme.id)
  //   this.setState({
  //     ...this.state,
  //     blogThemes: [
        
  //     ]
  //   })
  // };

  render() {
    const { users, blogThemes } = this.state;
    const value = {
      users,
      blogThemes,
      toggleFavorite: this.handleToggleFavorite,
      addUser: this.handleAddUser,
      deleteUser: this.handleDeleteUser,
    };
    return (
      <BlogContext.Provider value={value}>
        <div className="container">
          <Navbar />
          {this.state.errorMessage ? (
            <>
              <h2 className="error-msg">
                {this.state.errorMessage}
              </h2>
            </>
          ) : (
            <MainPage />
          )}
          <Footer />
        </div>
      </BlogContext.Provider>
    );
  }
}

export default App;
