import { NavLink } from "react-router-dom"

type ComponentProps = {
  appLabel: string
}

export default function Nav({ appLabel }: ComponentProps) {
  return (
    <div className="fixed inset-0 bg-green-700 h-12 flex gap-3 text-white font-bold">
      <NavLink to="/page1" className="p-3 underline">Page1</NavLink>
      <NavLink to="/page2" className="p-3 underline">Page2</NavLink>
      <NavLink to="/page3" className="p-3 underline">Page3</NavLink>
      <div className="grow"/>
      <div className="p-2 font-bold text-xl">{appLabel}</div>
    </div>
  )
}
