import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <header id="header">
          <Link to="/">
            <h1 id="title">Blog Theme Workshop</h1>
          </Link>
        </header>
      </nav>
    );
  }
}
