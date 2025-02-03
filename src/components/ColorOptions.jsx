import PropTypes from "prop-types";

const ColorOptions = ({ options, onGuess }) => {
  return (
    <div>
      <h4>Options</h4>
      <div className="color-options">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => onGuess(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

ColorOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGuess: PropTypes.func.isRequired,
};

export default ColorOptions;
