from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import copy

app = Flask(__name__)
CORS(app)

# Game Generation Functions
def generate_board():
    board = [[0 for _ in range(9)] for _ in range(9)]
    for i in range(0, 9, 3):
        fill_box(board, i, i)
    solve_sudoku(board)
    complete_board = copy.deepcopy(board)
    cells_to_remove = 42 # setted difficulty
    cells = [(i, j) for i in range(9) for j in range(9)]
    random.shuffle(cells)
    for i, j in cells[:cells_to_remove]:
        board[i][j] = 0
    return board, complete_board

def fill_box(board, row, col):
    nums = list(range(1, 10))
    random.shuffle(nums)
    for i in range(3):
        for j in range(3):
            board[row + i][col + j] = nums.pop()

# Solver Functions
def find_empty(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return (i, j)
    return None

def is_valid(board, num, pos):
    for x in range(9):
        if board[pos[0]][x] == num and pos[1] != x:
            return False
    for x in range(9):
        if board[x][pos[1]] == num and pos[0] != x:
            return False
    box_x, box_y = pos[1] // 3, pos[0] // 3
    for i in range(box_y * 3, box_y * 3 + 3):
        for j in range(box_x * 3, box_x * 3 + 3):
            if board[i][j] == num and (i, j) != pos:
                return False
    return True

def solve_sudoku(board):
    empty = find_empty(board)
    if not empty:
        return True
    row, col = empty
    for num in range(1, 10):
        if is_valid(board, num, (row, col)):
            board[row][col] = num
            if solve_sudoku(board):
                return True
            board[row][col] = 0
    return False

# Routes
@app.route('/generate', methods=['GET'])
def generate():
    puzzle, solution = generate_board()
    return jsonify({'puzzle': puzzle, 'solution': solution})

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    board = data['board']
    solved_board = copy.deepcopy(board)
    if solve_sudoku(solved_board):
        return jsonify({'solution': solved_board})
    return jsonify({'error': 'No solution exists'}), 400

@app.route('/check', methods=['POST'])
def check():
    data = request.get_json()
    board = data['board']
    solution = data['solution']
    return jsonify({'isCorrect': board == solution})

if __name__ == '__main__':
    app.run(debug=True, port=5000)