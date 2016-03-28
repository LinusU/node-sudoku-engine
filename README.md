# Sudoku Engine

Everything you need to build your own sudoku tool/app.

## Installation

```sh
npm install --save sudoku-engine
```

## Usage

```javascript
const sudoku = require('sudoku-engine')
const board = sudoku.generateSolution()

sudoku.printBoard(board)
```

## API

### `.generateSolution() -> Board`

Generate and return a solved board.

### `.generatePuzzle(solution, difficulty) -> Board`

Generate a puzzle from a solved board. The puzzle is guaranteed to have only one
solution.

`difficulty` should be a number between `0` and `3` inclusivly, where `0` means
easiest and `3` means hardest.

### `.validateSolution(board) -> Boolean`

Validate that a board holds a valid solution.

### `.printBoard(board)`

Prints a board to the console.
