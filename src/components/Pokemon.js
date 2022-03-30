import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getPokemonArray } from "../data/pokemonData";
import PokemonCard from "./PokemonCard";

function Pokemon({}) {
  let params = useParams();
  const [onAddToCart] = useOutletContext();
  const pokemonArray = getPokemonArray();
  const pokemon = pokemonArray.find((el) => {
    return el.num === parseInt(params.pokemonId);
  });
  const willRenderPokemon = pokemon === undefined ? false : true;
  if (willRenderPokemon) {
    return (
      <div>
        <h1>This is the Pokemon!</h1>
        <PokemonCard
          name={pokemon.name}
          isShop={true}
          onAddToCart={onAddToCart}
        />
      </div>
    );
  } else {
    return (
      <div className="error-container">
        <h1 className="error-message">
          Pokemon with index: {params.pokemonId} doesn't exist in our database!
          Please try again.
        </h1>
      </div>
    );
  }
}

export default Pokemon;
