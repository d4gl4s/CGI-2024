import { movieType } from "@/types/types"
import { formatStartTime } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"

const MovieCard = ({ movie }: { movie: movieType }) => {
  return (
    <article className="bg-red-300 relative z-4">
      <Link href={"/" + movie.id}>
        <div className="relative h-[200px]">
          <Image
            src={movie.poster}
            style={{
              objectFit: "cover",
            }}
            fill
            alt="movie poster"
          />
        </div>
        <h3 className="font-semibold text-[1.1em] mt-1">{movie.title}</h3>
        <p className="leading-[1px] mt-1 font-medium text-[0.8em] text-slate-400">{movie.genre}</p>
        <p className="text-[1.25em] font-bold mt-3">{formatStartTime(movie.startTime)}</p>
        <div className="absolute top-3 right-[-1.5em] w-10 h-10 rounded-[50px] bg-[#F2A040] flex items-center justify-center text-[#663561] font-bold text-[0.9em]">{movie.imdbScore}</div>
      </Link>
    </article>
  )
}

export default MovieCard
