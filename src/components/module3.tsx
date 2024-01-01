import DoodadA from "./doodadA"

type ComponentProps = {
  appLabel: string
  handleAppLabelUpdate: (newLabel: string) => void
}

export default function Module3({
  appLabel,
  handleAppLabelUpdate,
}: ComponentProps) {
  console.log(`Module3 rendered`)

  return (
    <div className="p-5 bg-blue-700 my-5">
      <div>This is module 3</div>
      <DoodadA
        appLabel={appLabel}
        handleAppLabelUpdate={handleAppLabelUpdate}
      />
    </div>
  )
}
