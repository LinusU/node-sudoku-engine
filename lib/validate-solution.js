'use strict'

function validateRow (puzzle, idx) {
  let numbers = new Set()

  for (let i = 0; i < 9; i++) {
    if (numbers.has(puzzle[idx * 9 + i])) {
      return false
    } else {
      numbers.add(puzzle[idx * 9 + i])
    }
  }

  return true
}

function validateColumn (puzzle, idx) {
  let numbers = new Set()

  for (let i = 0; i < 9; i++) {
    if (numbers.has(puzzle[i * 9 + idx])) {
      return false
    } else {
      numbers.add(puzzle[i * 9 + idx])
    }
  }

  return true
}

function validateBox (puzzle, idx) {
  let numbers = new Set()

  for (let i = 0; i < 9; i++) {
    const x = i % 3
    const y = i / 3 | 0

    if (numbers.has(puzzle[y * 9 + x])) {
      return false
    } else {
      numbers.add(puzzle[y * 9 + x])
    }
  }

  return true
}

function validateSolution (puzzle) {
  for (let i = 0; i < 9; i++) {
    if (!validateRow(puzzle, i)) return false
    if (!validateColumn(puzzle, i)) return false
    if (!validateBox(puzzle, i)) return false
  }

  return true
}

module.exports = validateSolution
