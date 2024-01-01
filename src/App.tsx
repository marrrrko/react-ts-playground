import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import StateTester from "./components/state-tester"
import Page1 from "./components/page1"
import Page2 from "./components/page2"
import Nav from "./components/nav"
import { useState } from "react"
import Page3 from "./components/page3"

export default function App() {
  console.log(`App rendered`)
  const [appLabel, setAppLabel] = useState("React Playground")
  const [darkBackground, setDarkBackground] = useState(true)

  const handleBackgroundToggle = () => {
    setDarkBackground(!darkBackground)
  }

  const handleAppLabelUpdate = (newLabel: string) => {
    setAppLabel(newLabel)
  }

  return (
    <BrowserRouter>
      <div
        className={`${
          darkBackground
            ? "bg-neutral-700 text-white"
            : "bg-neutral-100 text-black"
        } pt-16 min-h-screen px-5`}
      >
        <Nav appLabel={appLabel} />
        <div>
          <Routes>
            <Route path="state-tests" element={<StateTester />} />
            <Route
              path="page1"
              element={
                <Page1 handleBackgroundToggle={handleBackgroundToggle} />
              }
            />
            <Route
              path="page2"
              element={
                <Page2
                  appLabel={appLabel}
                  handleAppLabelUpdate={handleAppLabelUpdate}
                />
              }
            />
            <Route
              path="page3"
              element={
                <Page3 />
              }
            />
            <Route index element={<Navigate to="page1" />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

function NoMatch() {
  return <div>Nothing here</div>
}
