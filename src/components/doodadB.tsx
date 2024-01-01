import { useState } from "react"

type ComponentProps = {
  handleBackgroundToggle: () => void
}

export default function DoodadB({ handleBackgroundToggle }: ComponentProps) {
  console.log(`DoodadB rendered`)
  const [hasFunkyColor, setHasFunkyColor] = useState(false)

  return (
    <div
      className={`bg-rose-400 w-64 text-black mt-5 p-5 rounded shadow-lg ${
        hasFunkyColor ? "bg-cyan-600 text-white" : "bg-rose-400"
      }`}
    >
      <div>This is Doodad B</div>
      <div>
        <button
          className="bg-slate-200 text-black mt-1 hover:bg-green-500"
          onClick={handleBackgroundToggle}
        >
          Toggle Page
        </button>
        <button
          className="bg-slate-200 text-black mt-1 hover:bg-green-500"
          onClick={() => {
            setHasFunkyColor(!hasFunkyColor)
          }}
        >
          Toggle Doodad
        </button>
      </div>
    </div>
  )
}
