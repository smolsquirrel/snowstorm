import "./App.css"

import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Platforms from "./pages/Platforms"

function App() {
	return (
		<Box display="flex">
			<Sidebar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/platforms" element={<Platforms />} />
			</Routes>
		</Box>
	)
}

export default App
