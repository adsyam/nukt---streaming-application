import { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { AnimatedRoutes } from "./components"
import "./index.css"

function App() {
  const [sideIsOpen, setSideIsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
