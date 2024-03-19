export function createArrayFrom1To48() {
  const arr = []
  for (let i = 1; i <= 48; i++) {
    arr.push(i)
  }
  return arr
}

export function recommendedSeats(seatCount: number, takenSeats: number[]) {
  let recommendedSeats = [] as number[]
  if (takenSeats.length + seatCount >= 48) return recommendedSeats // No seats left

  const numRows: number = 6
  const numCols: number = 8

  let seatMatrix: boolean[][] = []
  let seatIndex = 1
  for (let i = 0; i < numRows; i++) {
    seatMatrix[i] = []
    for (let j = 0; j < numCols; j++) {
      seatMatrix[i][j] = takenSeats.includes(seatIndex++) // Initialize each seat as false if seat is not taken (unoccupied)
    }
  }
  return findAvailableSeats(seatCount, seatMatrix) as number[]
}

// Helper functions

function checkRowAvailableSeatsNextToEachOther(rows: number[], seatCount: number, seatMatrix: boolean[][]): [number, number][] {
  // Function to check if the given row has seatCount seats available next to each other
  function hasAvailableSeats(row: number, seatCount: number): boolean {
    for (let col = 0; col <= seatMatrix[row].length - seatCount; col++) {
      let found = true
      for (let i = col; i < col + seatCount; i++) {
        if (seatMatrix[row][i]) {
          found = false
          break
        }
      }
      if (found) return true
    }
    return false
  }

  let availableSeats: [number, number][] = []
  let maxCenterDistance = -1
  let chosenRow: number | null = null

  for (let row of rows) {
    if (hasAvailableSeats(row, seatCount)) {
      let centerDistance = Math.abs(seatMatrix[row].length / 2 - (seatCount / 2 + rows.indexOf(row)))
      if (centerDistance > maxCenterDistance) {
        chosenRow = row
        maxCenterDistance = centerDistance
      }
    }
  }

  if (chosenRow !== null) {
    for (let col = 0; col <= seatMatrix[chosenRow].length - seatCount; col++) {
      let found = true
      for (let i = col; i < col + seatCount; i++) {
        if (seatMatrix[chosenRow][i]) {
          found = false
          break
        }
      }
      if (found) {
        availableSeats.push([chosenRow, col])
        for (let i = col; i < col + seatCount; i++) {
          seatMatrix[chosenRow][i] = true // Mark seats as taken
        }
        break // Exit loop once found
      }
    }
  }

  return availableSeats
}

function convertToSeatNumber(row: number, col: number, numCols: number): number {
  return row * numCols + col + 1
}

function convertSeatPositionsToNumbers(seatPositions: [number, number][], numCols: number): number[] {
  let seatNumbers: number[] = []
  for (let seat of seatPositions) {
    let seatNumber = convertToSeatNumber(seat[0], seat[1], numCols)
    seatNumbers.push(seatNumber)
  }
  return seatNumbers
}

function findAvailableSeats(seatCount: number, seatMatrix: boolean[][]) {
  const rowPriorities = [
    [2, 3],
    [1, 4],
    [0, 1],
  ] // Prioritize rows based on business rule

  for (const rowPriority of rowPriorities) {
    const seats = checkRowAvailableSeatsNextToEachOther(rowPriority, seatCount, seatMatrix)
    if (seats.length === seatCount) return convertSeatPositionsToNumbers(seats, seatMatrix[0].length)
  }
  return [] // Return null if no suitable seats found
}
