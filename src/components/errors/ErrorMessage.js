import React, { Component } from "react";

// error message rendered if something goes wrong
export default class ErrorMessage extends Component {
  state = {
    error: null,
    count: 10,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.count > 0) {
        this.setState({ count: this.state.count - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-message">
          <h2>Something went wrong.</h2>
          {this.state.count > 0 ? (
            <p>OH NO! THIS APP WILL SELF-DESTRUCT IN {this.state.count} </p>
          ) : (
            <p>Just kidding, you just try refreshing the browser.</p>
          )}
        </main>
      );
    }
    // if no error the app renders normally
    return this.props.children;
  }
}
