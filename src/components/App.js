import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { getPokemonArray } from "../data/pokemonData";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [indicesToRender, setIndicesToRender] = useState([]);

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
  }, []);
  return (
    <div className="pokemon-collection">
      {indicesToRender.map((index) => {
        if (allPokemon.length < 1) return null;
        return (
          <PokemonCard
            key={index}
            name={allPokemon[index].name}
          />
        );
      })}
    </div>
  );
}

export default App;
