import { useEffect, useState } from "react"

import InfoIcon from "@mui/icons-material/Info"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Slider from "@mui/material/Slider"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import Bump from "../components/Bump"
import Chord from "../components/Chord"
import HeatMap from "../components/HeatMap"
import MultiLine from "../components/MultiLine"
import OptionsBar from "../components/OptionsBar"
import Pie from "../components/Pie"
import SimpleLine from "../components/SimpleLine"
import { DailyStats } from "../interfaces/DailyStats"

const api_url = import.meta.env.VITE_API_URL

interface Data {
	[key: string]: LineChartDataGroup
}
interface LineChartDataGroup {
	[key: string]: LineChartData[]
}
interface LineChartData {
	id: string
	data: LineChartDataPoint[]
}
interface LineChartDataPoint {
	x: string | number
	y: number
}

const applyDateRange = (range: number[], lineData: Array<any>) => {
	if (lineData.length == 0) return []
	const start = Math.floor((range[0] / 100) * lineData.length)
	const end = Math.floor((range[1] / 100) * lineData.length)
	return lineData.slice(start, end)
}

function Assets() {
	const [numLoaded, setNumLoaded] = useState(0)
	const [statType, setStatType] = useState("VOLUME" as keyof DailyStats)
	const [data, setData] = useState<Data>({ thirty: { VOLUME: [] } })
	const [stable, setStable] = useState<{ x: string; y: number }[]>([])
	const [bump, setBump] = useState<Data>({ thirty: { VOLUME: [] } })
	const [chord, setChord] = useState<{ labels: string[]; data: number[][] }>({
		labels: [],
		data: [],
	})
	const [pie, setPie] = useState<{
		[keys: string]: { [keys: string]: { id: string; label: string; value: number }[] }
	}>({
		thirty: { SWAPS: [], USERS: [], VOLUME: [] },
		seven: { SWAPS: [], USERS: [], VOLUME: [] },
	})
	const [heat, setHeat] = useState<{ id: string; data: { x: string; y: number }[] }[]>([])
	const [selectedData, setSelectedData] = useState<LineChartData[]>([
		{
			id: "dummy",
			data: [{ x: "0", y: 0 }],
		},
	])
	const [selectedBump, setSelectedBump] = useState<LineChartData[]>([
		{
			id: "dummy",
			data: [{ x: 0, y: 1 }],
		},
	])
	const [interval, setInterval] = useState("thirty")
	const [range, setRange] = useState([0, 100])

	useEffect(() => {
		fetch(api_url + "/asset/daily_line")
			.then((r) => r.json())
			.then((d) => {
				setData(d)
				setSelectedData(d[interval][statType])
				setNumLoaded((prevState) => prevState + 1)
			})
		fetch(api_url + "/asset/daily_bump")
			.then((r) => r.json())
			.then((d) => {
				setBump(d)
				setSelectedBump(d[interval][statType])
				setNumLoaded((prevState) => prevState + 1)
			})
		fetch(api_url + "/asset/flows")
			.then((r) => r.json())
			.then((d) => {
				setChord(d["data"])
				setNumLoaded((prevState) => prevState + 1)
			})

		fetch(api_url + "/asset/pie")
			.then((r) => r.json())
			.then((d) => {
				setPie(d)
				setNumLoaded((prevState) => prevState + 1)
			})
		fetch(api_url + "/asset/heat_map")
			.then((r) => r.json())
			.then((d) => {
				setHeat(d["data"])
				setNumLoaded((prevState) => prevState + 1)
			})
		fetch(api_url + "/asset/stable_line")
			.then((r) => r.json())
			.then((d) => {
				setStable(d["data"])
				setNumLoaded((prevState) => prevState + 1)
			})
	}, [])

	useEffect(() => {
		setSelectedData(data[interval][statType])
		setSelectedBump(bump[interval][statType])
	}, [statType, interval])

	const handleStat = (_event: React.MouseEvent<HTMLElement>, newStat: string) => {
		setStatType(newStat as keyof DailyStats)
	}

	const handleInterval = (_event: React.MouseEvent<HTMLElement>, newInterval: string) => {
		setInterval(newInterval)
	}

	const handleRange = (_event: Event, newValue: number | number[]) => {
		setRange(newValue as number[])
	}

	return (
		<Grid container direction="column" spacing={2} sx={{ width: "100%" }}>
			<Grid item>
				<Box
					component={Paper}
					display="flex"
					justifyContent="space-between"
					p={2}
					sx={{ borderTop: 10, borderColor: "#ee5253" }}
				>
					<Typography variant="h3">Assets</Typography>
				</Box>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<OptionsBar
						text={"Daily " + statType.charAt(0) + statType.slice(1).toLowerCase()}
						statType={statType}
						interval={interval}
						handleStat={handleStat}
						handleInterval={handleInterval}
						disable={numLoaded < 6}
					/>
				</Grid>
				<Grid item>
					<Box component={Paper} sx={{ height: "50vh" }}>
						<MultiLine
							data={selectedData}
							interval={interval === "all_time" ? "month" : "day"}
						/>
					</Box>
				</Grid>
			</Grid>

			<Grid item container direction="column">
				<Grid item>
					<OptionsBar
						text={
							"Daily Ranking by " +
							statType.charAt(0) +
							statType.slice(1).toLowerCase()
						}
						statType={statType}
						interval={interval}
						handleStat={handleStat}
						handleInterval={handleInterval}
						disable={numLoaded < 6}
					/>
				</Grid>
				<Grid item>
					<Box component={Paper} sx={{ height: "60vh" }}>
						<Bump data={selectedBump} />
					</Box>
					<Typography variant="subtitle1" sx={{ fontSize: 12 }}>
						*Although it may appear that two lines are sharing the same rank on the
						earlier dates, it is simply because of one of the lines is being extended to
						the beginning. This is only a visual bump, not an actual conflict. Refer to
						the points to see where each lines ranking properly starts.
					</Typography>
				</Grid>
			</Grid>

			<Grid item container>
				<Grid item container direction="column" xl={6} lg={12}>
					<Grid item>
						<OptionsBar
							text={
								statType.charAt(0) +
								statType.slice(1).toLowerCase() +
								" Distribution"
							}
							statType={statType}
							interval={interval}
							handleStat={handleStat}
							handleInterval={handleInterval}
							disable={numLoaded < 6}
						/>
					</Grid>
					<Grid item>
						<Box component={Paper} sx={{ height: "60vh" }}>
							<Pie data={pie} interval={interval} statType={statType} />
							<Typography variant="subtitle2">
								* distribution among top 10 assets
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid item container direction="column" xl={6} lg={12}>
					<Grid item>
						<Box
							component={Paper}
							display="flex"
							justifyContent="space-between"
							p={2.4}
							sx={{ borderTop: 10, borderColor: "#ee5253" }}
						>
							<Typography variant="h4">Asset Flows (7D)</Typography>
							<Tooltip title="The width of each band represents the volume flowing from the selected asset to other assets. For example, the width of the WAVAX-USDC band on the WAVAX side represents the volume of WAVAX being swapped to USDC.">
								<InfoIcon />
							</Tooltip>
						</Box>
					</Grid>
					<Grid item>
						<Box component={Paper} sx={{ height: "60vh" }}>
							<Chord labels={chord.labels} data={chord.data} />
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item container direction="column" marginTop={2}>
				<Grid item>
					<Box
						component={Paper}
						display="flex"
						justifyContent="space-between"
						p={2.4}
						sx={{ borderTop: 10, borderColor: "#ee5253" }}
					>
						<Typography variant="h4">Asset Volume Change by Platform (7D)</Typography>
						<Tooltip title="Percent change in volume between the past week (the last 7 days) and the week before that. Considers the top 10 assets of the past week.">
							<InfoIcon />
						</Tooltip>
					</Box>
				</Grid>
				<Grid item>
					<Box component={Paper} sx={{ height: "60vh" }}>
						<HeatMap data={heat} />
					</Box>
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<Box
						component={Paper}
						display="flex"
						justifyContent="space-between"
						p={2.4}
						sx={{ borderTop: 10, borderColor: "#ee5253" }}
					>
						<Typography variant="h4">Stablecoin Volume Percentage</Typography>
					</Box>
				</Grid>
				<Grid item>
					<Box component={Paper} sx={{ height: "50vh" }}>
						<SimpleLine data={applyDateRange(range, stable)} type="Stable Percent" />
					</Box>
				</Grid>
				<Grid item>
					<Slider
						value={range}
						onChange={handleRange}
						sx={{ color: "#ee5253", maxWidth: "95%" }}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Assets
