import { useState, useCallback, useEffect, useMemo } from "react";
import { useError } from "../context/ErrorContext";
import {
  createSquare,
  deleteAllSquares,
  getAllSquares,
} from "../utils/SquareService";

const COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F39C12",
  "#8E44AD",
  "#16A085",
  "#2980B9",
  "#C0392B",
  "#00FFFF",
  "#FF69B4",
];

export const UseSquares = (initialGridSize = 1, initialSquares = []) => {
  const [squares, setSquares] = useState(initialSquares);
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [lastColor, setLastColor] = useState(null);
  const { setError } = useError();

  useEffect(() => {
    const fetchSquares = async () => {
      try {
        const fetchedSquares = await getAllSquares();
        setSquares(fetchedSquares);
        const newGridSize = Math.ceil(Math.sqrt(fetchedSquares.length));
        setGridSize(Math.max(newGridSize, 1));
      } catch (error) {
        console.error("Failed to fetch squares:", error);
        setError(error.message);
      }
    };

    fetchSquares();
  }, [setError]);

  const generateRandomColor = useCallback(() => {
    try {
      let newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      while (newColor === lastColor) {
        newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      setLastColor(newColor);
      return newColor;
    } catch (error) {
      console.error("Error generating random color", error);
      setError("Unable to generate a new color at this time");
      return "#FFFFFF";
    }
  }, [lastColor, setError]);

  const getGridPosition = useCallback(
    (index) => {
      try {
        // Calculate the current grid size needed to accommodate the new square
        // Math.sqrt gets the square root, and Math.ceil rounds up to ensure we have enough space
        // We add 1 to index since we start at 0 but need minimum size of 1
        const currentSize = Math.ceil(Math.sqrt(index + 1));

        // Calculate position within the current expansion
        // Subtracts the squares from previous grid size to find position in current expansion
        // Example: for index 4 in a 3x3 grid: 4 - (2 * 2) = 0, meaning first position in new expansion
        const positionInCurrentExpansion =
          index - (currentSize - 1) * (currentSize - 1);

        // Position determination based on calculated values
        if (positionInCurrentExpansion === 0) {
          // First position in new expansion - always top of the new column
          return { row: 1, col: currentSize };
        } else if (positionInCurrentExpansion < currentSize) {
          // Positions along the right edge, moving downward
          // row increases by 1 for each position, column stays at currentSize
          return { row: positionInCurrentExpansion + 1, col: currentSize };
        } else {
          // Positions along the bottom edge, moving left
          // Calculate column position from right to left
          // Row stays at currentSize (bottom edge)
          const colOffset = 2 * currentSize - positionInCurrentExpansion - 1;
          return { row: currentSize, col: colOffset > 0 ? colOffset : 1 };
        }
      } catch (error) {
        // Error handling in case of calculation failures
        console.error("Error calculating grid position", error);
        setError("Something went wrong. Please try again.");
        return { row: 1, col: 1 }; // Default to top-left position
      }
    },
    [setError],
  );

  const addSquare = useCallback(async () => {
    try {
      const position = getGridPosition(squares.length);

      const newSquare = {
        id: squares.length,
        color: generateRandomColor(),
        row: position.row,
        column: position.col,
      };
      await createSquare(newSquare);
      setSquares((prevSquares) => [...prevSquares, newSquare]);
    } catch (error) {
      console.error("Failed to add a new square", error);
      setError(error.message);
    }
  }, [squares, generateRandomColor, setError, getGridPosition]);

  const clearSquares = useCallback(async () => {
    try {
      if (squares.length === 0) {
        return;
      }
      await deleteAllSquares();
      setSquares([]);
      setGridSize(1);
    } catch (error) {
      console.error("Failed to clear aquares", error);
      setError(error.message);
    }
  }, [squares, setError]);

  useEffect(() => {
    if (squares.length > gridSize * gridSize) {
      setGridSize(gridSize + 1);
    }
  }, [squares, gridSize]);

  const squareStyles = useMemo(() => {
    try {
      return squares.map((square) => {
        return {
          backgroundColor: square.color,
          gridRow: square.row,
          gridColumn: square.column,
        };
      });
    } catch (error) {
      console.error("Error generating square styles", error);
      setError("Something went wrong. Please try again.");
      return [];
    }
  }, [squares, setError]);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    }),
    [gridSize],
  );

  return {
    squares,
    gridSize,
    addSquare,
    clearSquares,
    getGridPosition,
    squareStyles,
    gridStyle,
  };
};
