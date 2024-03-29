"use client"

import { ageRatingType } from "@/types/types"
import { useState } from "react"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

interface Dropdown {
  selectedOption: string
  options: string[] | ageRatingType[]
  handleVersionSelect(version: string | ageRatingType): void
  disabled: boolean
}

const Dropdown = ({ selectedOption, options, handleVersionSelect, disabled }: Dropdown) => {
  const [open, setOpen] = useState<boolean>(false)

  function handleSelect(option: string | ageRatingType) {
    if (disabled) return
    handleVersionSelect(option)
    setOpen(false)
  }

  if (disabled)
    return (
      <div className="relative text-[0.9em] ml-1 mb-1">
        <div className="flex w-[10em] flex-row text-slate-300 items-center justify-between py-2 px-4 bg-slate-50 border border-solid border-slate-200 border-1 rounded-[4px] cursor-not-allowed">
          <span className="mr-1 font-medium">{selectedOption}</span>
          {open ? <IoMdArrowDropup size={18} /> : <IoMdArrowDropdown size={18} />}
        </div>
      </div>
    )

  return (
    <div className="relative text-[0.9em] ml-1 mb-1">
      <div
        onClick={() => setOpen(!open)}
        className={
          "flex w-[10em] flex-row text-slate-600 items-center justify-between py-2 px-4 bg-slate-50 border border-solid border-slate-400 border-1 rounded-[4px] cursor-pointer " +
          (selectedOption != "Genre" && selectedOption != "Language" && selectedOption != "Age Rating" && selectedOption != "Start Time" && " bg-[#d8dfe8]")
        }
      >
        <span className="mr-1 font-medium">{selectedOption}</span>
        {open ? <IoMdArrowDropup size={18} /> : <IoMdArrowDropdown size={18} />}
      </div>
      {open && (
        <ul className="absolute top-[40px] text-slate-600 justify-between py-2 pl-4 w-full bg-slate-50 border border-solid border-slate-400 border-1 rounded-[4px] z-20">
          {options.map((option, i) => (
            <li key={i} className={"mb-2 cursor-pointer w-fit  w-full " + (selectedOption == option && " font-bold")} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
