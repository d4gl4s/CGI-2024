"use client"
import { useEffect, useState } from "react"
import MovieGrid from "./MovieGrid"
import { ageRatingType, movieDetailsResponseType, moviePageResponse, movieType } from "@/types/types"
import Dropdown from "@/components/Dropdown"
import Checkbox from "@/components/Checkbox"
import PageNumberComponent from "./PageNumberComponent"

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
  return url.toString()
}

async function getMovies(filters: Filters) {
  const URL = generateURL(filters) as string
  console.log(URL)
  try {
    const res = await fetch(URL, {
      cache: "no-store",
    })
    if (!res.ok) {
      const errorResponse = await res.json()
      throw new Error(errorResponse.message || "Failed to fetch course.")
    }
    const data = (await res.json()) as moviePageResponse
    return { data, error: null }
  } catch (error) {
    return { data: null, error: "Something went wrong, try again later!" }
  }
}

function definePageNumbers(pageCount: number): number[] {
  let pageNumbers = []
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
}

export interface MoviesClientComponent {
  movies: movieDetailsResponseType
  getMovies: any
}

export default function MoviesClientComponent() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [movies, setMovies] = useState<movieType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalMovieCount, setTotalMovieCount] = useState<number>(0)
  const [totalPageCount, setTotalPageCount] = useState<number>(0)
  const [totalCurrentPageCount, setCurrentPageCount] = useState<number>(0)
  const [pageNumbers, setPageNumbers] = useState<number[]>([0])
  const [recommended, setRecommended] = useState<boolean>(false)
  const [selectedAgeRating, setSelectedAgeRating] = useState<ageRatingType | "Age Rating">("Age Rating")
  const [selectedGenre, setSelectedGenre] = useState<string>("Genre")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Language")
  const [selectedStartTime, setSelectedStartTime] = useState<string>("Start Time")

  // Call fetchMovies function on page load
  useEffect(() => {
    // Function to fetch movies based on filters
    const fetchMovies = async (page: number) => {
      const filters: Filters = {
        page: page, // Assuming you want to start from page 0
        ageRating: selectedAgeRating !== "Age Rating" ? selectedAgeRating : null,
        genre: selectedGenre !== "Genre" ? selectedGenre : null,
        language: selectedLanguage !== "Language" ? selectedLanguage : null,
        startTime: selectedStartTime !== "Start Time" ? selectedStartTime : null,
        recommended: recommended,
      }
      try {
        setLoading(true)
        const { data, error } = await getMovies(filters)
        if (error || !data) setError("Could not load movies data")
        else {
          setMovies(data.movies)
          setTotalMovieCount(data.totalElements)
          setPageNumbers(definePageNumbers(data.totalPages))
          setCurrentPageCount(data.movies.length + 10 * currentPage)
          setTotalPageCount(data.totalPages)
        }
      } catch (error) {
        setError("Something went wrong, try again later!")
      } finally {
        setLoading(false)
      }
    }

    fetchMovies(currentPage)
  }, [currentPage, recommended, selectedAgeRating, selectedGenre, selectedLanguage, selectedStartTime])

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

  function handlePageChange(newPage: number) {
    console.log(newPage)
    if (newPage < 0 || newPage >= totalPageCount) return
    setCurrentPage(newPage)
  }

  function handleRecommendedInputChange(newValue: boolean) {
    setRecommended(newValue)
  }

  function resetFilter() {
    setRecommended(false)
    setSelectedAgeRating("Age Rating")
    setSelectedGenre("Genre")
    setSelectedLanguage("Language")
    setSelectedStartTime("Start Time")
  }

  return (
    <>
      <h1 className="mt-20 mb-8 font-bold text-[2.5em]">Filmid</h1>
      <section className="flex justify-end mb-10 z-20">
        <Checkbox label="Recommended" selected={recommended} handleSelect={() => handleRecommendedInputChange(!recommended)} />
        <Dropdown selectedOption={selectedGenre} options={["Action", "Adventure", "Drama", "Animation", "Comedy", "Horror", "Crime"]} handleVersionSelect={handleGenreSelect} />
        <Dropdown selectedOption={selectedLanguage} options={["English", "Korean", "tere3"]} handleVersionSelect={handleLanguageSelect} />
        <Dropdown selectedOption={selectedAgeRating} options={["R", "PG", "PG_13", "G"]} handleVersionSelect={handleAgeRatingSelect} />
        <Dropdown selectedOption={selectedStartTime} options={["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]} handleVersionSelect={handleStartTimeSelect} />
        <button className="bg-indigo-400 px-4 rounded-md ml-1 text-white" onClick={resetFilter}>
          Reset
        </button>
      </section>
      {loading ? (
        <div className="h-[100vh]">Loading..</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className="flex justify-end mb-4 font-semibold">
            Page {currentPage + 1} - {totalCurrentPageCount}/{totalMovieCount} movies
          </div>
          <MovieGrid movies={movies} />
          <section className="w-fit flex m-auto mt-16 mb-32">
            {pageNumbers.map((number, i) => (
              <PageNumberComponent number={number} selected={number == currentPage} key={i} handlePageChange={handlePageChange} />
            ))}
          </section>
        </>
      )}
    </>
  )
}
