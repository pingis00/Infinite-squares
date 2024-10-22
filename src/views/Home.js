import Squares from "../components/Squares";
import Button from "../components/Button";
import { UseSquares } from "../hooks/UseSquares";

const Home = () => {
  const {
    squares,
    gridSize,
    addSquare,
    clearSquares,
    squareStyles,
    gridStyle,
  } = UseSquares();
  return (
    <section className="squares-interaction">
      <div className="button-container">
        <Button
          onClick={addSquare}
          label="Add Square"
          className="add-square-button"
        />
        <Button
          onClick={clearSquares}
          label="Clear All Squares"
          className="clear-squares-button"
        />
      </div>
      <div className="container">
        <Squares
          squares={squares}
          gridSize={gridSize}
          squareStyles={squareStyles}
          gridStyle={gridStyle}
        />
      </div>
    </section>
  );
};

export default Home;
