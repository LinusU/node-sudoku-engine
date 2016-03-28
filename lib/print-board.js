'use strict'

function printLine (puzzle, y) {
  const formatGroup = (idx) => {
    return ' ' + puzzle.subarray(y * 9 + idx * 3, y * 9 + idx * 3 + 3).join(' ').replace(/0/g, ' ') + ' '
  }

  console.log('|' + formatGroup(0) + '|' + formatGroup(1) + '|' + formatGroup(2) + '|')
}

function printBoard (puzzle) {
  for (let y = 0; y < 9; y++) {
    if (y % 3 === 0) {
      console.log('+-------+-------+-------+')
    }

    printLine(puzzle, y)
  }

  console.log('+-------+-------+-------+')
}

module.exports = printBoard
