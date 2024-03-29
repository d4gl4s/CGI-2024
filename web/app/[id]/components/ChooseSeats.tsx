"use client"

import { useState } from "react"
import Chair from "./Chair"
import { createArrayFrom1To48, recommendedSeats } from "../utils/suggestSeats"
import { errorResponse, movieType } from "@/types/types"
import { ScaleLoader } from "react-spinners"
import { MdErrorOutline } from "react-icons/md"
import { FaCheckCircle } from "react-icons/fa"

interface PurchaseRequestDTO {
  seatNumbers: number[]
  movie: movieType
}

export const addPurchase = async (purchaseRequestDTO: PurchaseRequestDTO) => {
  try {
    const res = await fetch("http://localhost:8080/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseRequestDTO),
    })

    if (!res.ok) {
      const errorResponse: errorResponse = await res.json()
      return {
        data: null,
        error: errorResponse.message,
      }
    }
    return {
      data: await res.text(),
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: "Somethign went wrong, try again later!",
    }
  }
}

const ChooseSeats = ({ unavailableSeats, movie }: { unavailableSeats: number[]; movie: movieType }) => {
  const availableSeatCount = 48 - unavailableSeats.length
  const [selected, setSelected] = useState<number[]>(recommendedSeats(Math.min(availableSeatCount, 1), unavailableSeats))
  const [ticketCount, setTicketCount] = useState<number>(selected.length != 0 ? 1 : 0)
  const seatNumbers = createArrayFrom1To48()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  async function handleNewPurchase() {
    // check if selected seats not in unavailable seats
    if (selected.length <= 0) {
      setError("Palun vali ostu soovitamiseks vähemalt üks vaba istekoht.")
      return
    }
    setLoading(true)
    const { data, error } = await addPurchase({ seatNumbers: selected, movie })
    if (error) {
      setError(error)
      setSuccess(false)
    } else {
      setSuccess(true)
      setError("")
    }
    setLoading(false)
  }

  function handleSelect(chairNumber: number) {
    // If chairNumber is already selected, deselect it
    if (selected.includes(chairNumber)) {
      let chairs = selected.filter((chair) => chair !== chairNumber)
      setSelected(chairs)
      setTicketCount(chairs.length)
    } else if (!unavailableSeats.includes(chairNumber)) {
      // If chairNumber is not selected and not unavailable, select it
      let chairs = [...selected, chairNumber]
      setSelected(chairs)
      setTicketCount(ticketCount + 1)
      setTicketCount(chairs.length)
    }
  }

  function handleSeatCountChange(newSeatCount: number) {
    setSelected(recommendedSeats(newSeatCount, unavailableSeats))
    setTicketCount(newSeatCount)
  }

  return (
    <section className="bg-[#333347] text-white p-16">
      <h1 className=" font-semibold text-[2em] mt-8 mb-6">Vali Istekohad 💺</h1>
      <section>
        <p className="mb-8">Istekohtade valimiseks vajuta kinoplaanil istekohale või automaatse soovituse saamiseks suurenda piletite arvu.</p>
        <div className="flex items-center">
          <span className="font-semibold">Piletite Arv:</span> <div className="ml-4 rounded-[5px] bg-[#515170]  px-5 py-2 w-16 flex items-center justify-center">{ticketCount}</div>
          <div
            className={
              "ml-2 rounded-[5px] bg-[#515170] px-5 py-2 flex items-center justify-center cursor-pointer font-black" +
              (ticketCount == availableSeatCount && " bg-[#393956] text-[#4D4D75] cursor-default")
            }
            onClick={() => handleSeatCountChange(Math.min(ticketCount + 1, availableSeatCount))}
          >
            +
          </div>
          <div
            className={"ml-2 rounded-[5px] bg-[#515170]  px-5 py-2  flex items-center justify-center cursor-pointer font-black " + (ticketCount == 0 && " bg-[#393956] text-[#4D4D75]  cursor-default")}
            onClick={() => handleSeatCountChange(Math.max(ticketCount - 1, 0))}
          >
            -
          </div>
        </div>

        <div className="mt-4 flex items-center h-8">
          <span className="mr-4 font-semibold">Valitud Istekohad: </span>
          {selected.length != 0 ? (
            <div className="ml-1 rounded-[5px] bg-[#515170]  px-4 py-2  flex items-center justify-center cursor-pointer">
              {selected.slice(0, 10).map((seatNumber, i) => (
                <div className="mr-1" key={i}>
                  {seatNumber},{" "}
                </div>
              ))}{" "}
              {selected.length > 10 && "..."}
            </div>
          ) : (
            "-"
          )}
        </div>
      </section>
      <section>
        <div className="w-[400px] grid grid-cols-8 gap-2 m-auto mt-12">
          {seatNumbers.map((number, i) => (
            <Chair key={i} status={selected.includes(number) ? "selected" : unavailableSeats.includes(number) ? "unavailable" : "open"} chairNumber={number} handleSelect={handleSelect} />
          ))}
        </div>
        <svg className="w-[500px] m-auto mt-10" viewBox="0 0 1831 204" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L912.612 55.5L1831 0V204H0V0Z" fill="#E0EEFF" />
        </svg>
      </section>
      <div className="flex-col mt-12 items-center">
        <button className="bg-blue-400 w-32 h-14 font-medium hover:bg-blue-500 flex items-center justify-center" onClick={handleNewPurchase}>
          {loading ? <ScaleLoader height={15} width={3} color="#ffffff" /> : "Osta piletid"}
        </button>
        {error != "" && (
          <div className="flex items-center mt-2 text-[#FF49A0]">
            <MdErrorOutline />
            <p className="ml-2">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center mt-2 text-[#59F4AA]">
            <FaCheckCircle />
            <p className="ml-2">Tehing oli edukas! Võid naasneda tagasi avalehele.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ChooseSeats
