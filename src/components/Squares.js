import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Squares = ({ squares, gridSize }) => {
  const [newSquareId, setNewSquareId] = useState(null);
  const [previousLength, setPreviousLength] = useState(0);

  useEffect(() => {
    if (squares.length > previousLength) {
      const lastSquare = squares[squares.length - 1];
      setNewSquareId(lastSquare.id);

      const timer = setTimeout(() => {
        setNewSquareId(null);
      }, 300);

      setPreviousLength(squares.length);
      return () => clearTimeout(timer);
    }
  }, [squares, previousLength]);

  return (
    <div className="square-container">
      <div
        className="square-area"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {squares.map((square) => (
          <div
            key={square.id}
            className={`square ${square.id === newSquareId ? "new-square" : ""}`}
            style={{
              backgroundColor: square.color,
              gridRow: square.row,
              gridColumn: square.column,
            }}
          />
        ))}
      </div>
    </div>
  );
};

Squares.propTypes = {
  squares: PropTypes.array.isRequired,
  gridSize: PropTypes.number.isRequired,
};

export default Squares;
