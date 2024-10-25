import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Squares = ({ squares, gridSize, squareStyles }) => {
  const [visibleSquares, setVisibleSquares] = useState([]);

  useEffect(() => {
    if (squares.length === 0) {
      setVisibleSquares([]);
    } else if (squares.length > 0) {
      const newSquare = squares[squares.length - 1];
      setVisibleSquares((prevVisibleSquares) => [
        ...prevVisibleSquares,
        newSquare.id,
      ]);
    }
  }, [squares]);

  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div className="square-container">
      <div className="square-area" style={gridStyle}>
        {squares.map((square, index) => (
          <div
            key={square.id}
            className={`square ${visibleSquares.includes(square.id) ? "visible" : ""}`}
            style={squareStyles[index]}
          ></div>
        ))}
      </div>
    </div>
  );
};

Squares.propTypes = {
  squares: PropTypes.array.isRequired,
  gridSize: PropTypes.number.isRequired,
  squareStyles: PropTypes.array.isRequired,
};

export default Squares;
