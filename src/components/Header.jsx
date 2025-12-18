export default function Header({ score, bestScore }) {
  return (
    <header>
      <div className="header-left">
        <h1>Pokemon Memory game</h1>
        <h2>Choose your pokemon, but make sure to not repeat it.</h2>
      </div>
      <div className="header-right">
        <h2>Score: {score}</h2>
        <h2>Best Score: {bestScore}</h2>
      </div>
    </header>
  );
}
