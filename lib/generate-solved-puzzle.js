'use strict'

const BASE_PUZZLE = new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  4, 5, 6, 7, 8, 9, 1, 2, 3,
  7, 8, 9, 1, 2, 3, 4, 5, 6,
  2, 3, 4, 5, 6, 7, 8, 9, 1,
  5, 6, 7, 8, 9, 1, 2, 3, 4,
  8, 9, 1, 2, 3, 4, 5, 6, 7,
  3, 4, 5, 6, 7, 8, 9, 1, 2,
  6, 7, 8, 9, 1, 2, 3, 4, 5,
  9, 1, 2, 3, 4, 5, 6, 7, 8
])

function swapChunk (array, idxA, idxB, chunkSize) {
  const valueA = array.slice(idxA * chunkSize, idxA * chunkSize + chunkSize)
  const viewB = array.subarray(idxB * chunkSize, idxB * chunkSize + chunkSize)

  array.set(viewB, idxA * chunkSize)
  array.set(valueA, idxB * chunkSize)
}

function swapSingleRow (puzzle, idxA, idxB) {
  swapChunk(puzzle, idxA, idxB, 9)
}

function swapSingleRowInGroup (puzzle, groupIdx, idxA, idxB) {
  swapSingleRow(puzzle, groupIdx * 3 + idxA, groupIdx * 3 + idxB)
}

function swapGroupOfRows (puzzle, idxA, idxB) {
  swapChunk(puzzle, idxA, idxB, 27)
}

function swapSingleColumn (puzzle, idxA, idxB) {
  for (let i = 0; i < 9; i++) swapChunk(puzzle, i * 9 + idxA, i * 9 + idxB, 1)
}

function swapSingleColumnInGroup (puzzle, groupIdx, idxA, idxB) {
  swapSingleColumn(puzzle, groupIdx * 3 + idxA, groupIdx * 3 + idxB)
}

function swapGroupOfColumns (puzzle, idxA, idxB) {
  for (let i = 0; i < 9; i++) swapChunk(puzzle, i * 3 + idxA, i * 3 + idxB, 3)
}

function generateSolvedPuzzle () {
  let puzzle = Uint8Array.from(BASE_PUZZLE)
  const rnd3 = () => (Math.random() * 3) | 0

  for (let i = 0; i < 27; i++) {
    swapSingleRowInGroup(puzzle, rnd3(), rnd3(), rnd3())
    swapGroupOfRows(puzzle, rnd3(), rnd3())
    swapSingleColumnInGroup(puzzle, rnd3(), rnd3(), rnd3())
    swapGroupOfColumns(puzzle, rnd3(), rnd3())
  }

  return puzzle
}

module.exports = generateSolvedPuzzle
