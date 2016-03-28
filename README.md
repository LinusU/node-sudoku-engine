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

### `.validateSolution(board) -> Boolean`

Validate that a board holds a valid solution. Returns a boolean.

### `.printBoard(board)`

Prints a board to the console.
