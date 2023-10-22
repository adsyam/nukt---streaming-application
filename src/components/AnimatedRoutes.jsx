import { AnimatePresence } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, SearchPage, WatchMovie, WatchTVSeries } from "../pages/index"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
  )
}

export default AnimatedRoutes
