import { movieDetailsResponseType, movieErrorDTO } from "@/types/types"
import { formatMinutes, formatStartTime } from "@/utils/helpers"
import ChooseSeats from "./components/ChooseSeats"
import Image from "next/image"

import { movieType } from "@/types/types"

interface PurchaseRequestDTO {
  seatNumbers: number[]
  movie: movieType
}

export const addPurchase = async (purchaseRequestDTO: PurchaseRequestDTO): Promise<void> => {
  try {
    const response = await fetch("http://localhost:8080/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseRequestDTO),
    })

    if (!response.ok) {
      throw new Error("Failed to add purchase")
    }

    const responseData = await response.text()
  } catch (error) {
    console.error("Error adding purchase:", error)
  }
}

async function getMovieDetails(id: number) {
  try {
    const res = await fetch(`http://localhost:8080/api/movies/${id}`, {
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

export default async function Home({ params }: { params: { id: number } }) {
  const { data, error } = (await getMovieDetails(params.id)) as movieErrorDTO
  if (error) return <div>Error: {error}</div>
  const movie = data?.movie!

  async function handleAddPurchase(seatNumbers: number[]) {
    "use server"
    await addPurchase({
      seatNumbers: seatNumbers,
      movie: movie,
    })
  }

  return (
    <main>
      <section className="flex mt-28 mb-16">
        <Image src={movie.poster} width={150} height={200} alt="movie poster" />

        <div className="ml-8 flex flex-col justify-between">
          <div>
            <h1 className=" font-bold text-[3em]">{movie.title}</h1>
            <div className="font-semibold text-[1.3em] mb-2">Algusaeg: {formatStartTime(movie.startTime)}</div>
          </div>
          <div className="flex text-[0.9em] font-semibold text-slate-400">
            <div className="bg-slate-100 px-6 py-2 mr-2 rounded-[50px]">{movie.genre}</div>
            <div className="bg-slate-100 px-6 py-2 mr-2 rounded-[50px]">Vanusepiirang: {movie.ageRating}</div>
            <div className="bg-slate-100 px-6 py-2 mr-2 rounded-[50px]">Kestvus: {formatMinutes(movie.duration)}</div>
            <div className="bg-slate-100 px-6 py-2 mr-2 rounded-[50px]">{movie.language}</div>
          </div>
        </div>
      </section>

      <ChooseSeats unavailableSeats={data?.nonAvailableSeats!} movie={movie} />
    </main>
  )
}
