import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getPokemonArray } from "../data/pokemonData";

function Shop() {
  const [cartItems, setCartItems] = useState({});
  const allPokemon = getPokemonArray();

  const handleChangeNumberClick = (e, index, action) => {
    if (action === "increment") {
      setCartItems((prevItems) => {
        if (prevItems[index]) {
          return { ...prevItems, [index]: prevItems[index] + 1 };
        } else {
          const items = { ...prevItems };
          items[index] = 1;
          return { ...items };
        }
      });
    }
    if (action === "decrement") {
      setCartItems((prevItems) => {
        if (prevItems[index] && prevItems[index] > 0) {
          return { ...prevItems, [index]: prevItems[index] - 1 };
        } else {
          return { ...prevItems, [index]: 0 };
        }
      });
    }
  };

  return (
    <main className="shop-container">
      <h1>This is the shop page!</h1>
      {console.log(cartItems)}
      <Outlet context={handleChangeNumberClick} />
    </main>
  );
}

export default Shop;
