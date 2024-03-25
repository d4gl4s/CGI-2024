import { movieType } from "@/types/types"
import MovieCard from "./MovieCard"

const MovieGrid = ({ movies }: { movies: movieType[] }) => {
  return (
    <section className="grid gap-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 z-2">
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </section>
  )
}

export default MovieGrid
