import { useEffect, useState } from "react"

import BarChartIcon from "@mui/icons-material/BarChart"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Slider from "@mui/material/Slider"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"

import Calendar from "../components/Calendar"
import HomeStats from "../components/HomeStats"
import SimpleLine from "../components/SimpleLine"
import TransactionsTable from "../components/TransactionsTable"
import { DailyStats } from "../interfaces/DailyStats"

const api_url = import.meta.env.VITE_API_URL

const selectStat = (type: keyof DailyStats, data: Array<DailyStats>) => {
	const calendarData = []
	const lineData = []
	for (const s of data) {
		calendarData.push({
			day: s["DATE"].slice(0, 10),
			value: s[type],
		})
		lineData.push({
			x: s["DATE"].slice(0, 10),
			y: s[type],
		})
	}
	return {
		calendarData: calendarData,
		lineData: lineData,
	}
}

const applyDateRange = (range: number[], lineData: Array<any>) => {
	if (lineData.length == 0) return []
	const start = Math.floor((range[0] / 100) * lineData.length)
	const end = Math.floor((range[1] / 100) * lineData.length)
	return lineData.slice(start, end)
}

function Home() {
	const [statType, setStatType] = useState("VOLUME" as keyof DailyStats)
	const [visType, setVisType] = useState("CHART")
	const [stats, setStats] = useState<Stats>({ SWAPS: 0, VOLUME: 0, USERS: 0 })
	const [daily, setDaily] = useState<Array<DailyStats>>([])
	const [calendarData, setCalendarData] = useState<any>([])
	const [lineData, setLineData] = useState<any>([])
	const [transactions, setTransactions] = useState([])
	const [range, setRange] = useState([0, 100])

	useEffect(() => {
		fetch(api_url + "/general/past_day")
			.then((r) => r.json())
			.then((data) => setStats(data["data"][0]))

		fetch(api_url + "/general/daily_stats")
			.then((r) => r.json())
			.then((data) => setDaily(data["data"]))

		fetch(api_url + "/general/recent_transactions")
			.then((r) => r.json())
			.then((data) => setTransactions(data["data"]))
	}, [])

	useEffect(() => {
		const data = selectStat(statType, daily)
		setCalendarData(data["calendarData"])
		setLineData(data["lineData"])
	}, [daily, statType])

	const handleStat = (event: React.MouseEvent<HTMLElement>, newStat: string) => {
		setStatType(newStat as keyof DailyStats)
	}

	const handleVis = (event: React.MouseEvent<HTMLElement>, newVis: string) => {
		setVisType(newVis)
	}

	const handleRange = (event: Event, newValue: number | number[]) => {
		setRange(newValue as number[])
	}

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<Box
					component={Paper}
					display="flex"
					justifyContent="space-between"
					p={2}
					sx={{ borderTop: 10, borderColor: "#ee5253" }}
				>
					<Typography variant="h3">Home</Typography>
				</Box>
			</Grid>
			<Grid item>
				<HomeStats data={stats} />
			</Grid>
			<Grid item>
				<Box
					component={Paper}
					display="flex"
					justifyContent="space-between"
					p={2}
					sx={{ borderTop: 10, borderColor: "#ee5253" }}
				>
					<Typography variant="h4">
						Daily {statType.charAt(0) + statType.slice(1).toLowerCase()}
					</Typography>
					<Box display="flex">
						<ToggleButtonGroup exclusive value={visType} onChange={handleVis}>
							<ToggleButton value="CHART" disabled={visType === "CHART"}>
								<BarChartIcon />
							</ToggleButton>
							<ToggleButton value="CALENDAR" disabled={visType === "CALENDAR"}>
								<CalendarMonthIcon />
							</ToggleButton>
						</ToggleButtonGroup>
						<Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />

						<ToggleButtonGroup exclusive value={statType} onChange={handleStat}>
							<ToggleButton value="VOLUME" disabled={statType === "VOLUME"}>
								Volume
							</ToggleButton>
							<ToggleButton value="USERS" disabled={statType === "USERS"}>
								Users
							</ToggleButton>
							<ToggleButton value="SWAPS" disabled={statType === "SWAPS"}>
								Swaps
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
				</Box>
			</Grid>
			<Grid item>
				{visType === "CHART" ? (
					<Box component={Paper}>
						<Grid container direction="column" spacing={1}>
							<Grid item sx={{ height: "50vh" }}>
								<SimpleLine
									data={applyDateRange(range, lineData)}
									type={statType}
								/>
							</Grid>
							<Grid item>
								<Slider
									value={range}
									onChange={handleRange}
									sx={{ color: "#ee5253", maxWidth: "95%" }}
								/>
							</Grid>
						</Grid>
					</Box>
				) : (
					<Box component={Paper} sx={{ height: "50vh" }}>
						<Calendar data={calendarData} />
					</Box>
				)}
			</Grid>
			<Grid item>
				<Box component={Paper} sx={{ borderTop: 10, borderColor: "#ee5253" }}>
					<Typography variant="h4" align="left" p={2}>
						Recent swaps
					</Typography>
					<TransactionsTable data={transactions} />
				</Box>
			</Grid>
		</Grid>
	)
}

export default Home
export interface Stats {
	SWAPS: number
	VOLUME: number
	USERS: number
}
