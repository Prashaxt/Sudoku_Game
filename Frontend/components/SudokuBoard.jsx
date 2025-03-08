import React from "react";

const SudokuBoard = ({ board, original, handleInputChange, isLocked }) => {
  const handleChange = (row, col, value) => {
    // Allow empty input (to clear the cell) or numbers 1-9
    if (value === '' || (/^[1-9]$/.test(value) && !isNaN(value))) {
      handleInputChange(row, col, value);
    }
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              step="1" // Ensures only whole numbers
              value={value === 0 ? '' : value}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              className={`sudoku-cell ${
                original && original[rowIndex][colIndex] !== 0 ? 'original' : ''
              }`}
              disabled={isLocked || (original && original[rowIndex][colIndex] !== 0)}
              // Prevent invalid inputs via input event
              onKeyDown={(e) => {
                if (
                  !/^[1-9]$/.test(e.key) && // Allow 1-9
                  e.key !== 'Backspace' && // Allow deleting
                  e.key !== 'Delete' &&
                  e.key !== 'Tab' // Allow navigation
                ) {
                  e.preventDefault();
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;