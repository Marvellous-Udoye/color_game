import PropTypes from "prop-types";

const Score = ({ score }) => {
  return <p data-testid="score">Score: {score}</p>;
};

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Score;
