import { useState } from "react";
import "./App.css";
import Pokemon from "./components/FetchApi";
import Header from "./components/Header";

function App() {
  const [allPokemons, setAllPokemon] = useState([
    "pikachu",
    "charizard",
    "bulbasaur",
    "pidgeot",
    "ninetales",
    "vulpix",
    "arbok",
    "primeape",
    "magneton",
    "onix",
    "cubone",
    "starmie",
  ]);

  const randomizeCards = () => {
    let randomizePokemonArray = [];
    while (true) {
      const index = Math.floor(Math.random() * 12, 0);
      if (randomizePokemonArray.includes(allPokemons[index])) continue;
      randomizePokemonArray.push(allPokemons[index]);
      if (randomizePokemonArray.length === 12) break;
    }
    setAllPokemon(randomizePokemonArray);
  };
  console.log(allPokemons);
  return (
    <>
      <Header />
      <Pokemon allPokemons={allPokemons} randomizeCards={randomizeCards} />
    </>
  );
}

export default App;
