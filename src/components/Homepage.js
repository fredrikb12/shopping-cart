import React from "react";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { getPokemonArray } from "../data/pokemonData";
import { useOutletContext } from "react-router-dom";

function Homepage() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [indicesToRender, setIndicesToRender] = useState([]);
  const [setIsInShop] = useOutletContext();

  useEffect(() => {
    setIsInShop(false);
  });

  useEffect(() => {

    const pokeData = getPokemonArray();
    setAllPokemon([...pokeData]);

    const get20RandomNumbers = () => {
      let amount = 897;
      const numbers = [];
      let numToTry;
      for (let i = 0; i < 20; i++) {
        do {
          numToTry = Math.floor(Math.random() * amount);
          if (!numbers.includes(numToTry)) numbers.push(numToTry);
        } while (!numbers.includes(numToTry));
      }
      setIndicesToRender([...numbers]);
    };
    get20RandomNumbers();
    //fetchData();
  }, []);
  return (
    <main className="homepage-container">
      <div className="welcome-headers">
        <h1>Welcome to the Poké Shop!</h1>
        <h2>Take a look around and buy something!</h2>
      </div>
      <div className="pokemon-collection">
        {indicesToRender.map((index) => {
          if (allPokemon.length < 1) return null;
          return <PokemonCard key={index} name={allPokemon[index].name} />;
        })}
      </div>
    </main>
  );
}

export default Homepage;
