'use strict'

exports.generateSolvedPuzzle = require('./lib/generate-solved-puzzle')
exports.validatePuzzle = require('./lib/validate-puzzle')
exports.printPuzzle = require('./lib/print-puzzle')

const p = exports.generateSolvedPuzzle()
console.log(exports.validatePuzzle(p))
exports.printPuzzle(p)
