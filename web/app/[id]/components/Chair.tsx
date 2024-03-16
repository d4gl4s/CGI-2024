interface Chair {
  status: "open" | "selected" | "unavailable"
  chairNumber: number
  handleSelect(chairNumber: number): void
}

const Chair = ({ status, chairNumber, handleSelect }: Chair) => {
  return (
    <div className={"relative flex justify-center items-center " + (status != "unavailable" && " cursor-pointer")} onClick={() => handleSelect(chairNumber)}>
      <svg viewBox="0 0 226 233" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="23" width="180" height="233" rx="26" fill={status == "open" ? "#4EE694" : status == "selected" ? "#FFFFFF" : "#FF8585"} />
        <rect x="180" y="101" width="46" height="116" rx="23" fill={status == "open" ? "#46A974" : status == "selected" ? "#CDCEED" : "#C14B4B"} />
        <rect y="101" width="46" height="116" rx="23" fill={status == "open" ? "#46A974" : status == "selected" ? "#CDCEED" : "#C14B4B"} />
      </svg>
      <div className={"absolute font-bold " + (status == "selected" && " text-[#334155]")}>{status != "unavailable" && chairNumber}</div>
    </div>
  )
}

export default Chair
