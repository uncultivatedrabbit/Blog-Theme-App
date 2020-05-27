import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
