import PropTypes from "prop-types";

const Squares = ({ squares, gridSize, squareStyles }) => {
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
            className="square"
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
