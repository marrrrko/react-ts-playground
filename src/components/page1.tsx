import Module1 from "./module1"
import Module2 from "./module2"

type ComponentProps = {
  handleBackgroundToggle: () => void
}

export default function Page1({ handleBackgroundToggle }: ComponentProps) {
  console.log(`Page1 rendered`)

  return (
    <div>
      <div>This is page 1</div>
      <Module1 />
      <Module2 handleBackgroundToggle={handleBackgroundToggle} />
    </div>
  )
}
