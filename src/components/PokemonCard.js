import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PokemonCard({ name, isShop, onClick, onAddToCart }) {
  const [pokemon, setPokemon] = useState({
    sprite: "",
    num: 0,
    species: "",
    color: "",
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await fetch("https://graphqlpokemon.favware.tech/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
      {
        getPokemon(pokemon: ${name}) {
            sprite
            num
            species
            height
        }
      }
    `,
        }),
      });
      const pokeData = await allData.json();
      if (pokeData.errors) console.log(pokeData);

      setPokemon(() => {
        if (pokeData.errors) return null;
        return pokeData.data.hasOwnProperty("getPokemon")
          ? pokeData.data.getPokemon
          : null;
      });
    };
    fetchData().catch(console.error);
  }, [name]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleIncrementDecrement = (e, type) => {
    setAmount((prevAmount) => {
      if (type === "increment") return parseInt(prevAmount) + 1;
      if (type === "decrement") return parseInt(prevAmount) - 1;
    });
  };

  if (!pokemon) return null;
  return (
    <div className="pokemon-card">
      <div className="card-container">
        {pokemon.sprite !== undefined ? (
          <Link to={`/shop/${pokemon.num}`}>
            <img
              className="pokemon-image"
              src={pokemon.sprite}
              alt={pokemon.species}
            />
          </Link>
        ) : (
          <p>Loading...</p>
        )}
        <p className="pokemon-name">
          {pokemon.species.slice(0, 1).toUpperCase() + pokemon.species.slice(1)}
        </p>
        <p>Height: {pokemon.height}m</p>
        <p>Index: {pokemon.num}</p>
      </div>
      {isShop ? (
        <div className="shop-amount-container">
          <div className="top-button-container">
            <button
              className="increment-button button"
              onClick={(e) => handleIncrementDecrement(e, "increment")}
            >
              +
            </button>
            <input
              type="number"
              className="amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <button
              className="decrement-button button"
              onClick={(e) => handleIncrementDecrement(e, "decrement")}
            >
              -
            </button>
          </div>
          <button
            className="add-cart-button"
            onClick={(e) => onAddToCart(e, pokemon.num, amount)}
          >
            Add to Cart
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default PokemonCard;
