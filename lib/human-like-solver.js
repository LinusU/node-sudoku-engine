'use strict'

const ALL_POSSIBLE = (1 << 10) - (1 << 1)

function eachRelated (x, y, fn) {
  for (let i = 0; i < 9; i++) {
    const bx = (i % 3) | 0
    const by = (i / 3) | 0

    if (i !== x) fn(i, y)
    if (i !== y) fn(x, i)
    if (bx !== x && by !== y) fn(bx, by)
  }
}

class BaseSolver {
  constructor (state, board) {
    if (state !== 'solved') {
      throw new Error('Not implemented')
    }

    this.buffer = new ArrayBuffer(244)
    this.board = new Uint8Array(this.buffer, 0, 81)
    this.hints = new Uint16Array(this.buffer, 82, 81)

    this.board.set(board)
  }

  clear (x, y) {
    const position = (y * 9 + x)
    const value = this.board[position]

    if (value === 0) {
      throw new Error('Cell already cleared')
    }

    this.board[position] = 0
    this.hints[position] = ALL_POSSIBLE

    eachRelated(x, y, (x, y) => {
      if (this.board[y * 9 + x] === 0) {
        let found = false

        eachRelated(x, y, (x, y) => {
          if (this.board[y * 9 + x] === value) found = true
        })

        if (found === false) {
          this.hints[y * 9 + x] |= (1 << value)
        }
      } else {
        this.hints[position] &= ~(1 << this.board[y * 9 + x])
      }
    })
  }

  fill (x, y, value) {
    const position = (y * 9 + x)

    if (this.board[position] !== 0) {
      throw new Error('Cell already filled')
    }

    this.board[position] = value
    this.hints[position] = 0

    eachRelated(x, y, (x, y) => {
      if (this.board[y * 9 + x] === 0) {
        this.hints[y * 9 + x] &= ~(1 << value)
      }
    })
  }

  save () {
    return this.buffer.slice(0)
  }

  load (data) {
    const dataView = new Uint8Array(data)
    const internalView = new Uint8Array(this.buffer)

    internalView.set(dataView)
  }

  emptyCells () {
    let empty = 0

    for (let i = 0; i < 81; i++) {
      if (this.board[i] === 0) empty++
    }

    return empty
  }
}

function singleBitHigh (bitmask) {
  return bitmask && !(bitmask & (bitmask - 1))
}

function singles (solver) {
  let ret = []

  for (let i = 0; i < 81; i++) {
    if (singleBitHigh(solver.hints[i])) {
      ret.push({ type: 'single', position: i, value: Math.log2(solver.hints[i]) })
    }
  }

  return ret
}

class HumanLikeSolver extends BaseSolver {
  generatePuzzle (difficulty) {
    const clearRandom = () => {
      const start = (Math.random() * 81) | 0

      for (let i = 0; i < 81; i++) {
        const pos = (start + i) % 81

        if (this.board[pos] !== 0) {
          const x = (pos % 9) | 0
          const y = (pos / 9) | 0

          this.clear(x, y)
          return
        }
      }

      throw new Error('Board empty')
    }

    let tries
    switch (difficulty) {
      case 0: tries = 6; break
      case 1: tries = 12; break
      case 2: tries = 24; break
      case 3: tries = 48; break
      default:
        throw new Error('Invalid difficulty: ' + difficulty)
    }

    while (tries > 0) {
      const data = this.save()

      clearRandom()

      if (this.isSolvable() === false) {
        this.load(data)
        tries--
      }
    }

    return this.board.slice(0)
  }

  solve () {
    let left = this.emptyCells()

    while (left > 0) {
      let fills = singles(this)

      if (fills.length === 0) {
        return false
      }

      for (let f of fills) {
        const x = (f.position % 9) | 0
        const y = (f.position / 9) | 0
        this.fill(x, y, f.value)
        left--
      }
    }

    return true
  }

  isSolvable () {
    const data = this.save()
    const solvable = this.solve()

    this.load(data)

    return solvable
  }
}

module.exports = HumanLikeSolver
