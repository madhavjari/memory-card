import { useState } from "react";
import "./App.css";
import Pokemon from "./components/FetchApi";
import Header from "./components/Header";

const allPokemons = [
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
];

function App() {
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Pokemon
        allPokemons={allPokemons}
        score={score}
        clickedPokemon={clickedPokemon}
        setClickedPokemon={setClickedPokemon}
        setScore={setScore}
        setBestScore={setBestScore}
        bestScore={bestScore}
      />
    </>
  );
}

export default App;
