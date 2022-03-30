import React from "react";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { getPokemonArray } from "../data/pokemonData";

function Homepage() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [indicesToRender, setIndicesToRender] = useState([]);

  useEffect(() => {
    /*const fetchData = async () => {
      const pokeData = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=897"
      );
      const data = await pokeData.json();
      const array = data.results.reduce((returnItem, item) => {
        return [...returnItem, { name: item.name, num: returnItem.length + 1 }];
      }, []);
      setAllPokemon(array);
    };*/

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
