import { useState, useCallback, useEffect, useMemo } from "react";

export const UseSquares = (initialGridSize = 1, initialSquares = []) => {
  const [squares, setSquares] = useState(initialSquares);
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [lastColor, setLastColor] = useState(null);

  const generateRandomColor = useCallback(() => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD"];
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    while (newColor === lastColor) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    }
    setLastColor(newColor);
    return newColor;
  }, [lastColor]);

  const addSquare = useCallback(() => {
    const newSquare = {
      id: squares.length,
      color: generateRandomColor(),
    };
    setSquares((prevSquares) => [...prevSquares, newSquare]);
  }, [squares, generateRandomColor]);

  const clearSquares = useCallback(() => {
    setSquares([]);
    setGridSize(1);
  }, []);

  useEffect(() => {
    if (squares.length > gridSize * gridSize) {
      setGridSize(gridSize + 1);
    }
  }, [squares, gridSize]);

  const getGridPosition = useCallback((index) => {
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
  }, []);

  const squareStyles = useMemo(() => {
    return squares.map((square, index) => ({
      backgroundColor: square.color,
      gridRow: getGridPosition(index).row,
      gridColumn: getGridPosition(index).col,
    }));
  }, [squares, getGridPosition]);

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
