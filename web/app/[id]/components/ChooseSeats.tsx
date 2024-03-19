"use client"

import { useState } from "react"
import Chair from "./Chair"
import { createArrayFrom1To48, recommendedSeats } from "../utils/suggestSeats"

const ChooseSeats = ({ unavailableSeats }: { unavailableSeats: number[] }) => {
  const availableSeatCount = 48 - unavailableSeats.length
  const [selected, setSelected] = useState<number[]>(recommendedSeats(Math.min(availableSeatCount, 1), unavailableSeats))
  const [ticketCount, setTicketCount] = useState<number>(selected.length != 0 ? 1 : 0)
  const seatNumbers = createArrayFrom1To48()

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
      <div className="flex items-center">
        Piletite Arv: <div className="ml-4 rounded-[5px] bg-[#515170]  px-5 py-2 w-16 flex items-center justify-center">{ticketCount}</div>
        <div
          className="ml-2 rounded-[5px] bg-[#515170] px-5 py-2 flex items-center justify-center cursor-pointer font-black"
          onClick={() => handleSeatCountChange(Math.min(ticketCount + 1, availableSeatCount))}
        >
          +
        </div>
        <div className="ml-2 rounded-[5px] bg-[#515170]  px-5 py-2  flex items-center justify-center cursor-pointer font-black" onClick={() => handleSeatCountChange(Math.max(ticketCount - 1, 0))}>
          -
        </div>
      </div>

      <div className="mt-4 flex items-center h-8">
        <span className="mr-4">Valitud Istekohad: </span>
        {selected.length != 0 && (
          <div className="ml-1 rounded-[5px] bg-[#515170]  px-4 py-2  flex items-center justify-center cursor-pointer">
            {selected.map((seatNumber, i) => (
              <div className="mr-1" key={i}>
                {seatNumber},{" "}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-[400px] grid grid-cols-8 gap-2 m-auto mt-12">
        {seatNumbers.map((number, i) => (
          <Chair key={i} status={selected.includes(number) ? "selected" : unavailableSeats.includes(number) ? "unavailable" : "open"} chairNumber={number} handleSelect={handleSelect} />
        ))}
      </div>
      <svg className="w-[500px] m-auto mt-10" viewBox="0 0 1831 204" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L912.612 55.5L1831 0V204H0V0Z" fill="#E0EEFF" />
      </svg>
    </section>
  )
}

export default ChooseSeats
