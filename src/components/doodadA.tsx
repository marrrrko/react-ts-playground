type ComponentProps = {
  appLabel: string
  handleAppLabelUpdate: (newLabel: string) => void
}

export default function DoodadA({
  appLabel,
  handleAppLabelUpdate,
}: ComponentProps) {
  console.log(`DoodadA rendered`)

  return (
    <div className="bg-rose-400 w-64 text-black mt-5 p-5 rounded shadow-lg">
      <div>This is Doodad A</div>
      <div>
        <input
          type="text"
          value={appLabel}
          onChange={(e) => handleAppLabelUpdate(e.target.value)}
          className="w-40 border border-black m-2 p-1"
        ></input>
      </div>
    </div>
  )
}
