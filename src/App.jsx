import { useCallback, useEffect, useState } from "react";
import "./App.scss";
import ColorBox from "./components/ColorBox";
import ColorOptions from "./components/ColorOptions";
import GameInstructions from "./components/GameInstructions";
import GameStatus from "./components/GameStatus";
import Score from "./components/Score";

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getContrastingColor = (color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  const generateContrastingColors = useCallback((targetColor) => {
    const contrastingColors = [];
    for (let i = 0; i < 5; i++) {
      let color;
      do {
        color = generateRandomColor();
      } while (
        color === targetColor ||
        getContrastingColor(color) === getContrastingColor(targetColor)
      );
      contrastingColors.push(color);
    }
    return contrastingColors;
  }, []);

  const generateColorOptions = useCallback(
    (targetColor) => {
      const contrastingColors = generateContrastingColors(targetColor);
      const colors = [targetColor, ...contrastingColors];
      return colors.sort(() => Math.random() - 0.5);
    },
    [generateContrastingColors]
  );

  const startNewGame = useCallback(() => {
    const newTargetColor = generateRandomColor();
    setTargetColor(newTargetColor);
    setColorOptions(generateColorOptions(newTargetColor));
    setGameStatus("");
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

  const newGame = () => {
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
          <button
            data-testid="newGameButton"
            className="new-game-button"
            onClick={newGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
