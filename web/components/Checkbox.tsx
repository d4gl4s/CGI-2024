import { FaCheck } from "react-icons/fa"
interface Checkbox {
  label: string
  selected: boolean
  handleSelect(): void
}

const Checkbox = ({ label, selected, handleSelect }: Checkbox) => {
  return (
    <div
      className="text-[0.9em] mb-1 flex w-[11em] flex-row text-slate-800 items-center justify-between py-2 px-3 bg-slate-50 border border-solid border-slate-400 border-1 rounded-[4px] cursor-pointer"
      onClick={handleSelect}
    >
      {label}{" "}
      {selected ? (
        <div className="w-4 h-4 bg-[#2658D9] rounded-[3px] text-white flex justify-center items-center">
          <FaCheck size={10} />
        </div>
      ) : (
        <div className="w-4 h-4 bg-[#f8fafc] rounded-[3px] border border-[2px] border-slate-200"></div>
      )}
    </div>
  )
}

export default Checkbox
