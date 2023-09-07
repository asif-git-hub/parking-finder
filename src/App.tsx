import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"

import { NotFoundError } from "./pages/Error"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          <Route path="*" element={<NotFoundError></NotFoundError>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
