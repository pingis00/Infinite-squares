import React, {useEffect, useState} from "react";

const Squares = () => {
    const [squares, setSquares] = useState([]);
    const [gridSize, setGridSize] = useState(1);
    const [lastColor, setLastColor] = useState(null);

    const generateRandomColor = () => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD"];
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while (newColor === lastColor) {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        setLastColor(newColor);
        return newColor;
    };

    const addSquare = () => {
        const newSquare = {
            id: squares.length,
            color: generateRandomColor(),
        };
        setSquares((prevSquares) => [...prevSquares, newSquare]);
        
    };

    useEffect(() => {
        if (squares.length > gridSize * gridSize) {
          setGridSize(gridSize  + 1);
        }
    }, [squares, gridSize]);

    const getGridPosition = (index) => {
        if (index < 4) {
            const positions = [
                { row: 1, col: 1 },
                { row: 1, col: 2 },
                { row: 2, col: 2 },
                { row: 2, col: 1 },
            ];
            return positions[index];
        }   else {
            const currentSize = Math.ceil(Math.sqrt(index + 1));
            const positionInCurrentExpansion  = index - (currentSize - 1) * (currentSize - 1);

            if (positionInCurrentExpansion === 0) {
              return { row: 1, col: currentSize };
            } else if (positionInCurrentExpansion < currentSize) {
            return { row: positionInCurrentExpansion + 1, col: currentSize };
            } else {
              const colOffset = 2 * currentSize - positionInCurrentExpansion - 1;
              return { row: currentSize, col: colOffset > 0 ? colOffset : 1 };
            }
        }
    };

    return (       
        <div className="square-container">
            <div className="square-area" style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}>
                {squares.map((square, index) => (
                    <div
                        key={square.id}
                        className="square"
                        style={{ backgroundColor: square.color,
                        gridRow: getGridPosition(index).row,
                        gridColumn: getGridPosition(index).col
                        }}
                    ></div>
                ))}
            </div>
            <button className="add-square-button" onClick={addSquare}>
                Lägg till ruta
            </button>
        </div>
    );  
};
export default Squares;