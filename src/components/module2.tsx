import DoodadB from "./doodadB"

type ComponentProps = {
  handleBackgroundToggle: () => void
}

export default function Module2({ handleBackgroundToggle }: ComponentProps) {
  console.log(`Module2 rendered`)
  return (
    <div className="p-5 bg-orange-300 text-black my-5">
      <div>This is module 2</div>
      <DoodadB handleBackgroundToggle={handleBackgroundToggle} />
    </div>
  )
}
