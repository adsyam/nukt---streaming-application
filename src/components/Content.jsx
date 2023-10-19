import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { PopularMovie, TrendingMovie } from "./Movies"
import { PopularTVSeries } from "./TVSeries"

export default function Content() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      // You can trigger animations here when inView is true
    }
  }, [inView])

  const animationVariants = {
    hidden: { opacity: 0, x: -100 }, // Initially hidden with opacity 0 and x position to the left
    visible: { opacity: 1, x: 0 }, // Visible with opacity 1 and x position back to normal
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <PopularMovie />
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <TrendingMovie />
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <PopularTVSeries />
      </motion.div>
    </>
  )
}
