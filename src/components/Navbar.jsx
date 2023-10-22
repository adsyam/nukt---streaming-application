import {
  faBars,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import nukt_logo from "../assets/nukt_logo.png"
import { useLocation } from "react-router-dom"

const Navbar = () => {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const searchStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "6px 8px",
    borderRadius: "5px",
    outline: "none",
    color: "white",
    border: "1px solid white",
    minWidth: "300px",
  }

  const navigate = useNavigate()

  function searchEnter(e) {
    if (search !== "") {
      if (e.key === "Enter") {
        navigate(`/Search/${search}`)
      }
    }
  }
  return (
    <nav
      className={`bg-[#0A0E170] h-14 flex items-center fixed top-0 right-0 left-0 z-20`}
    >
      <div className="flex items-center mx-10 gap-3">
        <div role="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesomeIcon
              role="button"
              icon={faXmark}
              className="text-white text-2xl"
            />
          ) : (
            <FontAwesomeIcon
              role="button"
              icon={faBars}
              className="text-white text-2xl"
            />
          )}
        </div>
        <Link to={`/`} className="flex items-center gap-2">
          <img src={nukt_logo} alt="" width={35} height={41} />
          <p className="text-white font-bold">Nukt</p>
        </Link>
      </div>
      <div className="relative flex items-center justify-end">
        <input
          type="text"
          placeholder="Search Movies,TV Series, and more"
          style={searchStyle}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={searchEnter}
        />
        <Link
          className="text-white absolute pr-1.5"
          to={search !== "" ? `/Search/${search}` : null}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
