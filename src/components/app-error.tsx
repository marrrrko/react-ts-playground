import { useRouteError } from "react-router-dom"

export default function AppError() {
  const error = useRouteError() as any
  console.error(error)

  return (
    <div className="bg-amber-700 text-white min-h-screen p-10">
      <h1 className="font-bold text-xl">Fatal App Error</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
