import { useState } from "react"
import { Carousel, Content, Sidebar, Navbar } from "../components"
import { motion } from "framer-motion"


export default function Home({sideIsOpen, onSideIsOpen}) {
      const [getID, setGetID] = useState(null)
    return (
      <motion.div >
        <Navbar sidebarButton={sideIsOpen} onSideIsOpen={onSideIsOpen} />
        <div className="">
          {/* <Sidebar /> */}
          <div>
            <Carousel
              getID={getID}
              onSetGetID={setGetID}
            />
            <Content getID={getID} onSetGetID={setGetID} />
          </div>
        </div>
      </motion.div>
    )
}