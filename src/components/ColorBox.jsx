import PropTypes from "prop-types";

const ColorBox = ({ color }) => {
  return (
    <div>
      <h4>Target Color</h4>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

ColorBox.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorBox;
