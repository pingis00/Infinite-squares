import { useState, useCallback, useEffect, useMemo } from "react";
import { useError } from "../context/ErrorContext";
import {
  createSquare,
  deleteAllSquares,
  getAllSquares,
} from "../utils/SquareService";

export const UseSquares = (initialGridSize = 1, initialSquares = []) => {
  const [squares, setSquares] = useState(initialSquares);
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [lastColor, setLastColor] = useState(null);
  const { setError } = useError();

  useEffect(() => {
    const fetchSquares = async () => {
      try {
        console.log("Fetching squares...");
        const fetchedSquares = await getAllSquares();
        console.log("Fetched squares:", fetchedSquares);
        setSquares(fetchedSquares);

        const newGridSize = Math.ceil(Math.sqrt(fetchedSquares.length));
        console.log("Calculated grid size:", newGridSize);
        setGridSize(Math.max(newGridSize, 1));
      } catch (error) {
        console.error("Failed to fetch squares:", error);
        setError("Failed to load squares. Please refresh the page.");
      }
    };

    fetchSquares();
  }, [setError]);

  const generateRandomColor = useCallback(() => {
    try {
      const colors = [
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
      let newColor = colors[Math.floor(Math.random() * colors.length)];
      while (newColor === lastColor) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
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
        const currentSize = Math.ceil(Math.sqrt(index + 1));
        const positionInCurrentExpansion =
          index - (currentSize - 1) * (currentSize - 1);

        if (positionInCurrentExpansion === 0) {
          return { row: 1, col: currentSize };
        } else if (positionInCurrentExpansion < currentSize) {
          return { row: positionInCurrentExpansion + 1, col: currentSize };
        } else {
          const colOffset = 2 * currentSize - positionInCurrentExpansion - 1;
          return { row: currentSize, col: colOffset > 0 ? colOffset : 1 };
        }
      } catch (error) {
        console.error("Error calculating grid position", error);
        setError("Something went wrong. Please try again.");
        return { row: 1, col: 1 };
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
      setError("Failed to add a new square. Please try again");
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
      setError("Failed to clear squares. Please try again");
    }
  }, [squares, setError]);

  useEffect(() => {
    if (squares.length > gridSize * gridSize) {
      setGridSize(gridSize + 1);
    }
  }, [squares, gridSize]);

  const squareStyles = useMemo(() => {
    try {
      console.log("Current squares in squareStyles:", squares);
      return squares.map((square) => {
        console.log("Processing square:", square);
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
