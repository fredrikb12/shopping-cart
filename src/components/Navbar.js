import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import checkout from "../images/checkout.svg";

function Navbar() {
  const [isInShop, setIsInShop] = useState(false);
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
          {isInShop ? (
            <li>
              <button id="checkout-button"><img id="checkout-img" src={checkout} alt="cart-checkout"/></button>
            </li>
          ) : null}
        </ul>
      </nav>
      <Outlet context={setIsInShop} />
      <footer>
        <p>Fredrik B 2022</p>
      </footer>
    </div>
  );
}

export default Navbar;
