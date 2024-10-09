import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ExploreConnect</div>
      <div className="navbar-links">
        <a href="/" className="navbar-link">Places</a>
        <a href="/login" className="navbar-link">Login</a>
        <a href="/register" className="navbar-link">Register</a>
      </div>
    </nav>
  );
};

export default NavBar;
