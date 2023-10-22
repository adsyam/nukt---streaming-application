import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Home,
  SearchMedia,
  WatchMovie,
  WatchTVSeries,
} from "../src/pages/index"
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
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Search" element={<SearchMedia />}>
          <Route path=":query" element={<SearchMedia />} />
        </Route>
        <Route path="/Movie/:id" element={<WatchMovie />} />
        <Route path="/TVSeries/:id" element={<WatchTVSeries />}>
          <Route path=":Season/:Episode" element={<SearchMedia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
