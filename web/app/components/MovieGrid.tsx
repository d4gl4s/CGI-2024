import { movieType } from "@/types/types"
import MovieCard from "./MovieCard"

const MovieGrid = ({ movies }: { movies: movieType[] }) => {
  return (
    <section className="grid gap-12 grid-cols-5 z-2">
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index} />
      ))}
    </section>
  )
}

export default MovieGrid
