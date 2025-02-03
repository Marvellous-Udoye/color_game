import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import ColorOptions from "./components/ColorOptions";
import GameInstructions from "./components/GameInstructions";
import GameStatus from "./components/GameStatus";
import Score from "./components/Score";
import TryAnotherButton from "./components/TryAnotherButton";

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateShade = (color, factor) => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + factor));
    g = Math.min(255, Math.max(0, g + factor));
    b = Math.min(255, Math.max(0, b + factor));

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const generateColorOptions = useCallback((targetColor) => {
    const shades = [targetColor];
    for (let i = 0; i < 5; i++) {
      let shade;
      do {
        const factor = Math.floor(Math.random() * 30) - 15;
        shade = generateShade(targetColor, factor);
      } while (shade === targetColor || shades.includes(shade));
      shades.push(shade);
    }
    return shades.sort(() => Math.random() - 0.5);
  }, []);

  const startNewGame = useCallback(() => {
    const newTargetColor = generateRandomColor();
    setTargetColor(newTargetColor);
    setColorOptions(generateColorOptions(newTargetColor));
    setGameStatus("");
    setIsGameEnded(false);
  }, [generateColorOptions]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleColorGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("Correct!");
    } else {
      setIsAnimating(true);
      setGameStatus("Wrong! Try again.");
      setTimeout(() => setIsAnimating(false), 500);
    }
    setTimeout(startNewGame, 1000);
  };

  const resetGame = () => {
    setScore(0);
    startNewGame();
  };

  const endGame = () => {
    setIsGameEnded(true);
  };

  const startAgain = () => {
    setScore(0);
    startNewGame();
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title">
          <h1 className="typing-animation">Test your color perception</h1>
          <p className="game-subtitle">Guess the correct color!</p>
        </div>
      </div>

      {isGameEnded ? (
        <div className="end-game">
          <p>Your final score is: {score}</p>
          <button className="start-again-button" onClick={startAgain}>
            Start Again
          </button>
        </div>
      ) : (
        <div className={`game-board ${isAnimating ? "shake" : ""}`}>
          <GameInstructions />
          <div className="target-section">
            <ColorBox color={targetColor} />
          </div>

          <div className="game-content">
            <ColorOptions options={colorOptions} onGuess={handleColorGuess} />
            <GameStatus status={gameStatus} />
            <Score score={score} />
          </div>

          <div className="game-controls">
            <TryAnotherButton onClick={startNewGame} />
            <button
              data-testid="newGameButton"
              className="reset-button"
              onClick={resetGame}
            >
              Reset Game
            </button>
            <button className="end-game-button" onClick={endGame}>
              End Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
