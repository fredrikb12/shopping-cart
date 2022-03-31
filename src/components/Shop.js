import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import uniqid from "uniqid";

function Shop() {
  const favoritePokemon = [
    "charmander",
    "umbreon",
    "vaporeon",
    "squirtle",
    "zapdos",
    "bulbasaur",
    "gyarados",
    "sylveon",
    "vulpix",
    "helioptile",
  ];
  const mayLikePokemon = [
    "charizard",
    "blastoise",
    "wurmple",
    "geodude",
    "dialga",
    "urshifu",
  ];
  const [setIsInShop, setCartItems] = useOutletContext();

  useEffect(() => {
    setIsInShop(true);
  }, [setIsInShop]);

  const handleAddToCart = (e, index, number) => {
    e.preventDefault();
    setCartItems((prevItems) => {
      if (prevItems[index])
        return {
          ...prevItems,
          [index]:
            parseInt(prevItems[index]) + parseInt(number) < 0
              ? 0
              : parseInt(prevItems[index]) + parseInt(number),
        };

      return {
        ...prevItems,
        [index]: parseInt(number) < 0 ? 0 : parseInt(number),
      };
    });
  };

  return (
    <main className="shop-container">
      <div className="favorite-pokemon">
        <h2>Popular picks</h2>
        <div className="favorite-pokemon-container">
          {favoritePokemon.map((pokemon) => {
            return (
              <PokemonCard
                name={pokemon}
                isShop={true}
                onAddToCart={handleAddToCart}
                key={uniqid()}
              />
            );
          })}
        </div>
        <Outlet context={[handleAddToCart]} />
      </div>
      <div className="may-like-wrapper">
        <h2 className="may-like-header">You May Like</h2>
        <div className="may-like-container">
          {mayLikePokemon.map((pokemon) => {
            return (
              <PokemonCard
                name={pokemon}
                isShop={true}
                onAddToCart={handleAddToCart}
                key={uniqid()}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Shop;
