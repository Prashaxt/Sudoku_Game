# Sudoku Game

A Sudoku game with a backend implemented in Python using Flask and a frontend developed in React. This project allows users to generate Sudoku puzzles, solve them, validate their solutions, and even solve a Sudoku puzzle provided by the user.

## Features

- **Puzzle Generation**: Generate a new Sudoku puzzle with a predefined difficulty.
- **Puzzle Solving**: Solve a Sudoku puzzle using a backtracking algorithm.
- **Solution Validation**: Check if the user's solution to a puzzle is correct.
- **User-Provided Puzzle Solving**: The backend can solve a Sudoku puzzle provided by the user.
- **Frontend**: Interactive user interface built with React for a seamless gaming experience.

## Tech Stack

- **Backend**: Python, Flask
- **Frontend**: React
- **Additional Libraries**: 
  - Flask-CORS (for handling cross-origin requests)

## Setup Instructions

# Setup Instructions

To get the application running, follow these steps:

1. **Set up the backend:**
   - Open a terminal and navigate to the `backend` folder.
   - Run the following command to start the backend server:
     ```bash
     python app.py
     ```

2. **Set up the frontend:**
   - Open another terminal window and navigate to the `frontend` folder.
   - Run the following command to start the frontend server:
     ```bash
     npm run dev
     ```

3. **Access the application:**
   - Once both servers are running, open your browser and navigate to the provided link (usually shown in the terminal after running the frontend server).

Enjoy using the app!

### Prerequisites

Before running this project, make sure you have the following installed:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)

### Backend Setup (Flask)

1. Navigate to the `backend` folder.
2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
