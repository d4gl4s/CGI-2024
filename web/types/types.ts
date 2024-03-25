export type ageRatingType = "G" | "PG" | "PG_13" | "R" | "NC_17"

export interface movieType {
  id: number
  title: string
  genre: string
  directorsName: string
  ageRating: ageRatingType
  startTime: string
  duration: number
  language: string
  imdbScore: number
  poster: string
}

export interface purchaseType {
  id: number
  movie: movieType
  purchaseDate: string
}

export interface movieDetailsResponseType {
  movie: movieType
  nonAvailableSeats: number[]
}

export interface moviePageResponse {
  movies: movieType[]
  totalPages: number
  totalElements: number
}

export interface errorResponse {
  timeStamp: Date
  status: number
  error: string
  message: string
}

export type movieErrorDTO =
  | {
      data: movieDetailsResponseType
      error: null
    }
  | {
      data: null
      error: string
    }
