import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [indicesToRender, setIndicesToRender] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const pokeData = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=897"
      );
      const data = await pokeData.json();
      const array = data.results.reduce((returnItem, item) => {
        return [...returnItem, { name: item.name, num: returnItem.length + 1 }];
      }, []);
      setAllPokemon(array);
    };

    const get20RandomNumbers = () => {
      let amount = 897;
      const numbers = [];
      let numToTry;
      for (let i = 0; i < 21; i++) {
        do {
          numToTry = Math.floor(Math.random() * amount);
          if (!numbers.includes(numToTry)) numbers.push(numToTry);
        } while (!numbers.includes(numToTry));
      }
      setIndicesToRender([...numbers]);
    };
    get20RandomNumbers();
    fetchData();
  }, []);
  return (
    <div className="pokemon-collection">
      {indicesToRender.map((index) => {
        if (allPokemon.length < 1) return null;
        return <PokemonCard key={index} index={index} name={allPokemon[index - 1].name} />;
      })}
    </div>
  );
}

export default App;
