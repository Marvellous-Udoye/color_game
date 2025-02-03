import PropTypes from "prop-types";

const TryAnotherButton = ({ onClick }) => {
  return (
    <button
      className="try-another-button"
      onClick={onClick}
    >
      Try another
    </button>
  );
};

TryAnotherButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default TryAnotherButton;
