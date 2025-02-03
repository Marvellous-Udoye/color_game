import PropTypes from "prop-types";

const GameStatus = ({ status }) => {
  return (
    <p
      data-testid="gameStatus"
      className={status === "Correct!" ? "correct" : "wrong"}
    >
      {status}
    </p>
  );
};

GameStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default GameStatus;
