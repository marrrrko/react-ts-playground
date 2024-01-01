import Module1 from "./module1"
import Module3 from "./module3"

type ComponentProps = {
  appLabel: string
  handleAppLabelUpdate: (newLabel: string) => void
}

export default function Page2({
  appLabel,
  handleAppLabelUpdate,
}: ComponentProps) {
  console.log(`Page2 rendered`)

  return (
    <div>
      <div>This is page 2</div>
      <Module1 />
      <Module3
        appLabel={appLabel}
        handleAppLabelUpdate={handleAppLabelUpdate}
      />
    </div>
  )
}
