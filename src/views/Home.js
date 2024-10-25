import Squares from "../components/Squares";
import SectionHeader from "../components/SectionHeader";
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
      <div className="container">
        <div>
          <SectionHeader
            title="WizardWorks"
            subtitle="Click Add Square to generate colorful squares and watch them fill the grid. Clear them anytime."
          />
        </div>
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
