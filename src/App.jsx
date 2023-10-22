import { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { AnimatedRoutes } from "./components"
import "./index.css"
import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, SearchPage, WatchMovie, WatchTVSeries } from "../src/pages/index"

function App() {
  const [sideIsOpen, setSideIsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
//   const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Search" element={<SearchPage />}>
          <Route path=":query" element={<SearchPage />} />
        </Route>
        <Route path="/Movie/:id" element={<WatchMovie />} />
        <Route path="/TVSeries/:id" element={<WatchTVSeries />}>
          <Route path=":Season/:Episode" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
