import { useEffect, useState } from "react"

export default function Module1({}) {
  console.log(`Module1 rendered`)

  const [somethingSpecialIsHappening, setSomethingSpecialIsHappening] =
    useState(false)

  const backgroundColor = somethingSpecialIsHappening
    ? "bg-lime-400"
    : "bg-gray-400"

  const handleButtonClick = () => {
    if (!somethingSpecialIsHappening) setSomethingSpecialIsHappening(true)
  }

  useEffect(() => {
    async function startSomethingSpecial() {
      await doSomethingSpecial()
      setSomethingSpecialIsHappening(false)
    }

    if (somethingSpecialIsHappening) {
      startSomethingSpecial()
    }
  }, [somethingSpecialIsHappening])

  return (
    <div className={`p-5 ${backgroundColor} text-black my-5`}>
      <div>This is module 1</div>
      <button
        onClick={handleButtonClick}
        className="bg-neutral-100 focus:bg-neutral-100 shadow-xl"
      >
        {!somethingSpecialIsHappening && <span>Do something special</span>}
        {somethingSpecialIsHappening && (
          <span>Something special is happening</span>
        )}
      </button>
    </div>
  )
}

async function doSomethingSpecial() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 3000)
  })
}
