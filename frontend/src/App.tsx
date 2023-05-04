import "./App.css"

import { Route, Routes } from "react-router-dom"

import Box from "@mui/material/Box"

import Sidebar from "./components/Sidebar"
import Assets from "./pages/Assets"
import Home from "./pages/Home"
import Platforms from "./pages/Platforms"

function App() {
	return (
		<Box display="flex">
			<Sidebar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/platforms" element={<Platforms />} />
				<Route path="/assets" element={<Assets />} />
			</Routes>
		</Box>
	)
}

export default App
