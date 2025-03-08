import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SudokuBoard from '../components/SudokuBoard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [gamePuzzle, setGamePuzzle] = useState(null);
  const [gameSolution, setGameSolution] = useState(null);
  const [gameBoard, setGameBoard] = useState(null);
  const [gameStatus, setGameStatus] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [solverBoard, setSolverBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solvedBoard, setSolvedBoard] = useState(null);

  useEffect(() => {
    newGame();
  }, []);

  // Game Functions
  const newGame = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/generate`);
      setGamePuzzle(response.data.puzzle);
      setGameSolution(response.data.solution);
      setGameBoard(JSON.parse(JSON.stringify(response.data.puzzle)));
      setGameStatus('');
      setIsLocked(false);
    } catch (error) {
      console.error('Error generating puzzle:', error);
    }
  };

  const handleGameChange = (row, col, value) => {
    if (gamePuzzle[row][col] !== 0 || isLocked) return;
    const newBoard = [...gameBoard];
    newBoard[row][col] = value === '' ? 0 : parseInt(value);
    setGameBoard(newBoard);
  };

  const checkSolution = async () => {
    try {
      const response = await axios.post('http://localhost:5000/check', {
        board: gameBoard,
        solution: gameSolution
      });
      setGameStatus(response.data.isCorrect ? 'Congratulations! You won!' : 'Keep trying!');
    } catch (error) {
      console.error('Error checking solution:', error);
    }
  };

  const showGameSolution = () => {
    setGameBoard([...gameSolution]);
    setGameStatus('Solution shown');
    setIsLocked(true);  // Lock inputs
  };

  // Solver Functions
  const handleSolverChange = (row, col, value) => {
    const newBoard = [...solverBoard];
    newBoard[row][col] = value === '' ? 0 : parseInt(value);
    setSolverBoard(newBoard);
    setSolvedBoard(null);
  };

  const solvePuzzle = async () => {
    try {
      const response = await axios.post('http://localhost:5000/solve', { board: solverBoard });
      setSolvedBoard(response.data.solution);
    } catch (error) {
      alert('Error solving puzzle: ' + (error.response?.data?.error || error.message));
    }
  };

  const resetSolver = () => {
    setSolverBoard(Array(9).fill().map(() => Array(9).fill(0)));
    setSolvedBoard(null);
  };

  const renderBoard = (board, onChange, original = null) => {
    return board.map((row, i) => (
      <div key={i} className="sudoku-row">
        {row.map((cell, j) => (
          <input
            key={`${i}-${j}`}
            type="number"
            min="0"
            max="9"
            value={cell === 0 ? '' : cell}
            onChange={(e) => onChange(i, j, e.target.value)}
            disabled={original && original[i][j] !== 0}
            className={`sudoku-cell ${original && original[i][j] !== 0 ? 'original' : ''}`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="container">

      <div className='top'>
        <h1>Sudoku</h1>
      </div>

      <div className="bottom">


        <div className="boardArea">

          {activeTab === 'game' && (
            <div className="game-tab">
              <SudokuBoard
                board={gameBoard || Array(9).fill().map(() => Array(9).fill(0))}
                handleInputChange={handleGameChange}
                isLocked={isLocked}
              />
            </div>
          )}

          {activeTab === 'solver' && (
            <div className="solver-tab">
              <div className="sudoku-board">
                {solvedBoard ?
                  <SudokuBoard board={solvedBoard} handleInputChange={() => { }} /> :
                  <SudokuBoard board={solverBoard} handleInputChange={handleSolverChange} />
                }
              </div>
            </div>
          )}

        </div>

        <div className="buttons">

          <div className="upper">
            <button
              className={activeTab === 'game' ? 'active' : ''}
              onClick={() => setActiveTab('game')}
            >
              Play Game
            </button>
            <button
              className={activeTab === 'solver' ? 'active' : ''}
              onClick={() => setActiveTab('solver')}
            >
              Solver
            </button>
          </div>
          <div className="lower">
            {activeTab === 'game' && (
              <div className="game-tab">
                <div className="controls">
                  <button onClick={() => newGame()}>New Game</button>
                  <button onClick={checkSolution}>Check</button>
                  <button onClick={showGameSolution}>Show Solution</button>
                </div>
                {gameStatus && <div className="status">{gameStatus}</div>}
              </div>
            )}

            {activeTab === 'solver' && (
              <div className="solver-tab">
                <div className="controls">
                  <button onClick={solvePuzzle}>Solve</button>
                  <button onClick={resetSolver}>Reset</button>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>




      {/* <div className="App">
       

        {activeTab === 'game' && (
          <div className="game-tab">
            <SudokuBoard 
              board={gameBoard || Array(9).fill().map(() => Array(9).fill(0))}
              handleInputChange={handleGameChange}
              isLocked={isLocked}
            />
            <div className="controls">
              <button onClick={() => newGame()}>New Game</button>
              <button onClick={checkSolution}>Check</button>
              <button onClick={showGameSolution}>Show Solution</button>
            </div>
            {gameStatus && <div className="status">{gameStatus}</div>}
          </div>
        )}

        {activeTab === 'solver' && (
          <div className="solver-tab">
            <div className="controls">
              <button onClick={solvePuzzle}>Solve</button>
              <button onClick={resetSolver}>Reset</button>
            </div>
            <div className="sudoku-board">
              {solvedBoard ? 
                <SudokuBoard board={solvedBoard} handleInputChange={() => {}} /> : 
                <SudokuBoard board={solverBoard} handleInputChange={handleSolverChange} />
              }
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default App;