'use strict'

const HumanLikeSolver = require('./human-like-solver')

function generatePuzzle (solution, difficulty) {
  let solver = new HumanLikeSolver('solved', solution)
  return solver.generatePuzzle(difficulty)
}

module.exports = generatePuzzle
