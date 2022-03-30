import React, { useState, useEffect } from "react";

function PokemonCard({ name }) {
  const [pokemon, setPokemon] = useState({
    sprite: "",
    num: 0,
    species: "",
    color: "",
  });

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
        console.log(pokeData.data.getPokemon);
        if (pokeData.errors) return null;
        return pokeData.data.hasOwnProperty("getPokemon")
          ? pokeData.data.getPokemon
          : null;
      });
    };
    fetchData().catch(console.error);
  }, [name]);
  if (!pokemon) return null;
  return (
    <div className="pokemon-card">
      {pokemon.sprite !== undefined ? (
        <img
          className="pokemon-image"
          src={pokemon.sprite}
          alt={pokemon.species}
        />
      ) : (
        <p>Loading...</p>
      )}
      <p className="pokemon-name">
        {pokemon.species.slice(0, 1).toUpperCase() + pokemon.species.slice(1)}
      </p>
      <p>Height: {pokemon.height}m</p>
      <p>Index: {pokemon.num}</p>
    </div>
  );
}

export default PokemonCard;
