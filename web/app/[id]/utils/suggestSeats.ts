export function createArrayFrom1To48() {
  const arr = []
  for (let i = 1; i <= 48; i++) {
    arr.push(i)
  }
  return arr
}

export function recommendedSeats(seatCount: number, takenSeats: number[]) {
  let recommendedSeats = [] as number[]
  if (takenSeats.length + seatCount > 48) return recommendedSeats // No seats left

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
  return convertSeatPositionsToNumbers(findClosestSeatsToCenter(seatCount, seatMatrix), seatMatrix[0].length)
}

function checkRowAvailableSeatsNextToEachOther(rows: number[], seatCount: number, seatMatrix: boolean[][]): [number, number][] {
  function hasAvailableSeats(row: number, seatCount: number): [number, number][] | null {
    const availableSeats: [number, number][] = []
    for (let col = 0; col <= seatMatrix[row].length - seatCount; col++) {
      let found = true
      for (let i = col; i < col + seatCount; i++) {
        if (seatMatrix[row][i]) {
          found = false
          break
        }
      }
      if (found) {
        for (let i = col; i < col + seatCount; i++) {
          availableSeats.push([row, i])
        }
        return availableSeats
      }
    }
    return null
  }

  let maxCenterDistance = -1
  let chosenSeats: [number, number][] | null = null

  for (let row of rows) {
    const availableSeats = hasAvailableSeats(row, seatCount)
    if (availableSeats) {
      let centerDistance = Math.abs(seatMatrix[row].length / 2 - (seatCount / 2 + rows.indexOf(row)))
      if (centerDistance > maxCenterDistance) {
        chosenSeats = availableSeats
        maxCenterDistance = centerDistance
      }
    }
  }

  return chosenSeats ? chosenSeats : []
}

function findClosestSeatsToCenter(seatCount: number, seatMatrix: boolean[][]): [number, number][] {
  console.log(seatCount)
  console.log("her")
  const numRows = seatMatrix.length
  const numCols = seatMatrix[0].length

  let centerRow = Math.floor(numRows / 2)
  let centerCol = Math.floor(numCols / 2)

  // Calculate distances of each seat to the center
  const seatDistances: { position: [number, number]; distance: number }[] = []
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (!seatMatrix[row][col]) {
        const distance = Math.abs(centerRow - row) + Math.abs(centerCol - col)
        seatDistances.push({ position: [row, col], distance: distance })
      }
    }
  }

  // Sort seats by distance to center
  seatDistances.sort((a, b) => a.distance - b.distance)

  // Return the positions of seatCount seats closest to the center
  const closestSeats: [number, number][] = []
  for (let i = 0; i < Math.min(seatCount, seatDistances.length); i++) {
    closestSeats.push(seatDistances[i].position)
  }

  return closestSeats
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
