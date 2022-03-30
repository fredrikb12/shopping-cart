import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div className="container">
      <nav className="navbar">
        <h1>Poké Shop</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
