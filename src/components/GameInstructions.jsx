const GameInstructions = () => {
  return (
    <div data-testid="gameInstructions" className="game-instructions">
      <h3>How to play:</h3>
      <ul>
        <p>Differentiate between the target color and the options below.</p>
        <p>
          See if color options matches the target color.
        </p>
        <p>If you guess correctly, your score will increase.</p>
        <p>If you guess wrong, try again!</p>
        <p>Try another color and increase your chance of winning.</p>
      </ul>
    </div>
  );
};

export default GameInstructions;
