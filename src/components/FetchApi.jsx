import { useEffect, useState, useRef } from "react";
import "./component.css";

export default function Pokemon({
  allPokemons,
  score,
  setScore,
  setClickedPokemon,
  clickedPokemon,
  bestScore,
  setBestScore,
}) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
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
  }, [allPokemons]);

  const audioRef = useRef(null);

  const shuffleCards = () => {
    setPokemon((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const playSound = (url) => {
    audioRef.current.src = url;
    audioRef.current.volume = 0.1;
    audioRef.current.play();
  };

  const handleClick = (url, pokemon) => {
    playSound(url);
    shuffleCards();

    if (clickedPokemon.includes(pokemon)) {
      alert("Cant Catch 'em all! Try Again");
      setScore(0);
      setClickedPokemon([]);
    } else {
      const newClicked = [...clickedPokemon, pokemon];
      const newScore = score + 1;
      setClickedPokemon(newClicked);
      setScore(newScore);
      if (bestScore < newScore) setBestScore(newScore);
      if (newClicked.length === allPokemons.length) {
        setWon(true);
        alert("Catch 'em all! Congratulations");
        setScore(0);
        setClickedPokemon([]);
      }
    }
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
            onClick={() => handleClick(p.audio, p.theyCallMe)}
          />
          <h2 className="name">{p.theyCallMe}</h2>
        </div>
      ))}
      <audio ref={audioRef} preload="none" />;
    </article>
  );
}
