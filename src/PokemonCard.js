import React, { useState, useEffect } from "react";

function PokemonCard({ name, index }) {
  const [pokemon, setPokemon] = useState({
    sprite: "",
    num: 0,
    species: "",
    color: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const pokeData = await fetch("https://graphqlpokemon.favware.tech/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
      {
        getPokemon(pokemon: ${name}) {
            sprite
            shinySprite
            num
            species
            color
            height
        }
      }
    `,
        }),
      });
      const poke = await pokeData.json();

      setPokemon(() => {
        if(poke.errors) return null;
        return poke.data.hasOwnProperty("getPokemon")
          ? poke.data.getPokemon
          : null;
      });
    };
    fetchData().catch(console.error);
  }, [name]);
  if (!pokemon) return null;
  return (
    <div className="pokemon-card">
      <img
        className="pokemon-image"
        src={pokemon.sprite}
        alt={pokemon.species}
      />
      <p>Height: {pokemon.height}m</p>
      <p>Index: {index}</p>
    </div>
  );
}

export default PokemonCard;
