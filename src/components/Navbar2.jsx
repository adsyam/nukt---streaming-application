import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import nukt_logo from "../assets/nukt_logo.png"

const Navbar2 = () => {
  const [search, setSearch] = useState("")

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
        navigate(`/SearchPage/${search}`)
      }
    }
  }
  return (
    <nav className={`bg-[#0A0E170] h-14 flex items-center `}>
      <div className="flex items-center mx-10 gap-3">
        <FontAwesomeIcon
          role="button"
          icon={faBars}
          style={{ color: "#ffffff", fontSize: "25px" }}
        />
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
          to={search !== "" ? `/SearchPage/${search}` : null}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar2
