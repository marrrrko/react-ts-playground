import { useState } from "react"

export default function StateTester() {
  console.log(`Rendering StateTester`)
  const [i, setI] = useState(0)

  return (
    <div>
      <div className="mt-4 mb-1 font-bold text-lg">State Tester</div>
      <div>
        <ul>
          <li>
            <pre>i = {i}</pre>
            <button onClick={() => setI((oldI) => oldI + 1)}>Increase</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
