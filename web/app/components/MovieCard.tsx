import { movieType } from "@/types/types"
import { formatStartTime } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"

const MovieCard = ({ movie }: { movie: movieType }) => {
  return (
    <article className="relative z-4 h-full pb-2">
      <Link href={"/" + movie.id} className="flex flex-col justify-between h-full">
        <div>
          <div className="relative h-[200px]">
            <Image
              src={movie.poster}
              priority
              style={{
                objectFit: "cover",
              }}
              fill
              alt="movie poster"
            />
          </div>
          <h3 className="font-semibold text-[1.1em] mt-1 leading-[20px]">{movie.title}</h3>
          <p className="leading-[1px] mt-2 font-medium text-[0.8em] text-slate-400">{movie.genre}</p>
        </div>
        <p className="text-[1.3em] font-bold mt-3">{formatStartTime(movie.startTime)}</p>
        <div className="absolute top-3 right-[-1.5em] w-10 h-10 rounded-[50px] bg-[#F2A040] flex items-center justify-center text-[#663561] font-bold text-[0.9em]">{movie.imdbScore}</div>
      </Link>
    </article>
  )
}

export default MovieCard
