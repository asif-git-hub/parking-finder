import React, { useRef, useState, useEffect } from "react"
import { links } from "../data/nav.items"
import logo from "../assets/parking-logo.png"
import { FaBars } from "react-icons/fa"

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef<any>(null)
  const linksRef = useRef(null as unknown as HTMLUListElement)

  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  useEffect(() => {
    let linksHeight
    linksHeight = linksRef.current.getBoundingClientRect().height
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = "0px"
    }
  }, [showLinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <a href="/">
            <img src={logo} className="logo" alt="logo" />
            <h3>PARKING FINDER</h3>
          </a>
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link
              return (
                <li key={id} className="link-item">
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
