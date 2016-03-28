# Sudoku Engine

Everything you need to build your own sudoku tool/app.

## Installation

```sh
npm install --save sudoku-engine
```

## Usage

```javascript
const sudoku = require('sudoku-engine')
const puzzle = sudoku.generateSolvedPuzzle()

sudoku.printPuzzle(puzzle)
```

## API

### `.generateSolvedPuzzle() -> Puzzle`

Generate and return a solved puzzle.

### `.validatePuzzle(puzzle) -> Boolean`

Validate that a puzzle holds a valid solution. Returns a boolean.

### `.printPuzzle(puzzle)`

Prints a puzzle to the console.
