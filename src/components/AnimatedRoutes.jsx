import { AnimatePresence } from "framer-motion"
import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Home, SearchPage, VideoPage } from "../pages/index"

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SearchPage/:query" element={<SearchPage />} />
        <Route path="/VideoPage/:id" element={<VideoPage />} />
        <Route path="/SeriesPage/:id" element={<VideoPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
