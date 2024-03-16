import { ageRatingType, moviePageResponse } from "@/types/types"
import MoviesClientComponent from "./components/MoviesClientComponent"

interface Filters {
  page: number
  ageRating: ageRatingType | null
  genre: string | null
  language: string | null
  startTime: string | null
  recommended: boolean
}

function generateURL({ page, ageRating, genre, language, startTime, recommended }: Filters) {
  const url = new URL("/api/movies", "http://localhost:8080") // Adjust the base URL as needed
  url.searchParams.append("size", "10") // Specify the page size
  if (recommended) {
    url.searchParams.append("page", "0") // Specify the page number
    return url.toString()
  }
  url.searchParams.append("page", page.toString()) // Specify the page number
  if (ageRating) url.searchParams.append("ageRating", ageRating)
  if (genre) url.searchParams.append("genre", genre)
  if (language) url.searchParams.append("language", language)
  if (startTime) url.searchParams.append("startTime", startTime)
  return URL.toString()
}

async function getMovies(filters: Filters) {
  const URL = generateURL(filters)
  console.log(URL)
  try {
    const res = await fetch(URL, {
      cache: "no-store",
    })
    if (!res.ok) {
      const errorResponse = await res.json()
      throw new Error(errorResponse.message || "Failed to fetch course.")
    }
    const data = await res.json()
    return { data, error: null }
  } catch (error) {
    return { data: null, error: "Something went wrong, try again later!" }
  }
}

export default async function Home() {
  return (
    <main>
      <MoviesClientComponent />
    </main>
  )
}
