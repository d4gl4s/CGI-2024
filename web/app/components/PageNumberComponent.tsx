import { movieType } from "@/types/types"
import { formatStartTime } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"

const PageNumberComponent = ({ number, selected, handlePageChange }: { number: number; selected: boolean; handlePageChange: any }) => {
  return (
    <div
      className={"bg-slate-100 relative h-10 w-10 flex items-center justify-center mr-1 border border-solid border-2 cursor-pointer border-slate-300 " + (selected && " bg-slate-200 border-slate-400")}
      onClick={() => handlePageChange(number)}
    >
      {number + 1}
    </div>
  )
}

export default PageNumberComponent
