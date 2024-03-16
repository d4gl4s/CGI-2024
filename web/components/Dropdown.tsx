"use client"

import { ageRatingType } from "@/types/types"
import { useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

interface Dropdown {
  selectedOption: string
  options: string[] | ageRatingType[]
  handleVersionSelect(version: string | ageRatingType): void
}

const Dropdown = ({ selectedOption, options, handleVersionSelect }: Dropdown) => {
  const [open, setOpen] = useState<boolean>(false)

  function handleSelect(option: string | ageRatingType) {
    handleVersionSelect(option)
    setOpen(false)
  }

  return (
    <div className="relative text-[0.9em] ml-1">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-[10em] flex-row text-slate-600 items-center justify-between py-2 px-4 bg-slate-50 border border-solid border-slate-400 border-1 rounded-[4px] cursor-pointer"
      >
        <span className="mr-1 font-medium">{selectedOption}</span>
        {open ? <IoMdArrowDropup size={18} /> : <IoMdArrowDropdown size={18} />}
      </div>
      {open && (
        <ul className="absolute top-[40px] text-slate-600 justify-between py-2 px-4 w-full bg-slate-50 border border-solid border-slate-400 border-1 rounded-[4px]">
          {options.map((option, i) => (
            <li key={i} className="mb-2 cursor-pointer w-fit" onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
