"use client"
import { useEffect, useState } from "react"
import MovieGrid from "./MovieGrid"
import { ageRatingType, movieDetailsResponseType, moviePageResponse } from "@/types/types"
import Dropdown from "@/components/Dropdown"
import Checkbox from "@/components/Checkbox"

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

export interface MoviesClientComponent {
  movies: movieDetailsResponseType
  getMovies: any
}

export default function MoviesClientComponent() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [movies, setMovies] = useState<moviePageResponse[]>()
  const [recommended, setRecommended] = useState<boolean>(false)
  const [selectedAgeRating, setSelectedAgeRating] = useState<ageRatingType | "Age Rating">("Age Rating")
  const [selectedGenre, setSelectedGenre] = useState<string>("Genre")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Language")
  const [selectedStartTime, setSelectedStartTime] = useState<string>("Start Time")

  function handleAgeRatingSelect(selected: ageRatingType) {
    setSelectedAgeRating(selected)
  }
  function handleGenreSelect(selected: string) {
    setSelectedGenre(selected)
  }
  function handleLanguageSelect(selected: string) {
    setSelectedLanguage(selected)
  }
  function handleStartTimeSelect(selected: string) {
    setSelectedStartTime(selected)
  }

  return (
    <main>
      <h1 className="mt-20 mb-8 font-bold text-[2.5em]">Filmid</h1>
      <section className="flex justify-end">
        <Checkbox label="Recommended" selected={recommended} handleSelect={() => setRecommended(!recommended)} />
        <Dropdown selectedOption={selectedGenre} options={["tere1", "tere2", "tere3"]} handleVersionSelect={handleGenreSelect} />
        <Dropdown selectedOption={selectedLanguage} options={["tere1", "tere2", "tere3"]} handleVersionSelect={handleLanguageSelect} />
        <Dropdown selectedOption={selectedAgeRating} options={["tere1", "tere2", "tere3"]} handleVersionSelect={handleAgeRatingSelect} />
        <Dropdown selectedOption={selectedStartTime} options={["tere1", "tere2", "tere3"]} handleVersionSelect={handleStartTimeSelect} />
      </section>
      <section>{loading ? <div className="h-[100vh]">Loading..</div> : error ? <div>Error: {error}</div> : <MovieGrid />}</section>
    </main>
  )
}
