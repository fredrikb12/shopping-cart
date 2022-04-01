import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import uniqid from "uniqid";

function Shop() {
  const favoritePokemon = [
    { name: "charmander", id: 4 },
    { name: "umbreon", id: 197 },
    { name: "vaporeon", id: 134 },
    { name: "squirtle", id: 7 },
    { name: "zapdos", id: 145 },
    { name: "bulbasaur", id: 1 },
    { name: "gyarados", id: 130 },
    { name: "sylveon", id: 700 },
    { name: "vulpix", id: 37 },
    { name: "helioptile", id: 694 },
  ];
  const mayLikePokemon = [
    { name: "charizard", id: 6 },
    { name: "blastoise", id: 9 },
    { name: "wurmple", id: 265 },
    { name: "geodude", id: 74 },
    { name: "dialga", id: 483 },
    { name: "urshifu", id: 892 },
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
                name={pokemon.name}
                isShop={true}
                onAddToCart={handleAddToCart}
                key={pokemon.id}
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
                name={pokemon.name}
                isShop={true}
                onAddToCart={handleAddToCart}
                key={pokemon.id}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Shop;
