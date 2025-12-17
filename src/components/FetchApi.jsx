import { useEffect, useState, useRef } from "react";
import "./api.css";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/pikachu"
        );
        const results = await Promise.all(
          allPokemons.map(async (theyCallMe) => {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${theyCallMe}`
            );
            if (!response.ok) throw new Error("Pokemon not found");
            const result = await response.json();
            return {
              theyCallMe,
              image: result.sprites.other.dream_world.front_default,
              audio: result.cries.latest,
            };
          })
        );
        setPokemon(results);
      } catch (error) {
        setError("try again");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);
  const audioRef = useRef(null);
  const playSound = (url) => {
    audioRef.current.src = url;
    audioRef.current.volume = 0.1;
    audioRef.current.play();
  };
  if (loading) return <h4>Loading ...</h4>;
  if (error) return <h4>Error: {error}</h4>;
  return (
    <article>
      {pokemon.map((p) => (
        <div className="card" key={p.theyCallMe}>
          <img
            src={p.image}
            alt={p.theyCallMe}
            className="pokemon-images"
            onClick={() => playSound(p.audio)}
          />

          <h2 className="name">{p.theyCallMe}</h2>
        </div>
      ))}
      <audio ref={audioRef} preload="none" />;
    </article>
  );
}
