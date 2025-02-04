import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const GameInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="game-instructions">
      <h3 onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        How to play <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </h3>
      <ul className={`instructions-list ${isOpen ? 'open' : ''}`}>
        <li>- Differentiate between the target color and options</li>
        <li>- See if color options matches the target color</li>
        <li>- If you guess correctly, your score will increase.</li>
        <li>- If you guess wrong, try again!</li>
      </ul>
    </div>
  );
};

export default GameInstructions;
