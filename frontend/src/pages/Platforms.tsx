import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import Bump from "../components/Bump"
import Chord from "../components/Chord"
import MultiLine from "../components/MultiLine"
import OptionsBar from "../components/OptionsBar"
import Pie from "../components/Pie"
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

function Platforms() {
	const [statType, setStatType] = useState("VOLUME" as keyof DailyStats)
	const [data, setData] = useState<Data>({ thirty: { VOLUME: [] } })
	const [bump, setBump] = useState<Data>({ thirty: { VOLUME: [] } })
	const [chord, setChord] = useState<{ labels: string[]; data: number[][] }>({
		labels: [],
		data: [],
	})
	const [pie, setPie] = useState<{
		[keys: string]: { [keys: string]: { id: string; label: string; value: number }[] }
	}>({
		all_time: { SWAPS: [], USERS: [], VOLUME: [] },
		thirty: { SWAPS: [], USERS: [], VOLUME: [] },
		seven: { SWAPS: [], USERS: [], VOLUME: [] },
	})
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

	useEffect(() => {
		fetch(api_url + "/platform/daily_line")
			.then((r) => r.json())
			.then((d) => {
				setData(d)
				setSelectedData(d[interval][statType])
			})
		fetch(api_url + "/platform/daily_bump")
			.then((r) => r.json())
			.then((d) => {
				setBump(d)
				setSelectedBump(d[interval][statType])
			})
		fetch(api_url + "/platform/overlap")
			.then((r) => r.json())
			.then((d) => {
				setChord(d["data"])
			})

		fetch(api_url + "/platform/pie")
			.then((r) => r.json())
			.then((d) => {
				setPie(d)
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
					<Typography variant="h3">Platforms</Typography>
				</Box>
			</Grid>
			<Grid item>
				<OptionsBar
					text={"Daily " + statType.charAt(0) + statType.slice(1).toLowerCase()}
					statType={statType}
					interval={interval}
					handleStat={handleStat}
					handleInterval={handleInterval}
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
			<Grid item>
				<OptionsBar
					text={"Ranking by " + statType.charAt(0) + statType.slice(1).toLowerCase()}
					statType={statType}
					interval={interval}
					handleStat={handleStat}
					handleInterval={handleInterval}
				/>
			</Grid>
			<Grid item>
				<Box component={Paper} sx={{ height: "50vh" }}>
					<Bump data={selectedBump} />
				</Box>
			</Grid>
			<Grid item container>
				<Grid item container direction="column" xs={6}>
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
						/>
					</Grid>
					<Grid item>
						<Box component={Paper} sx={{ height: "60vh" }}>
							<Pie data={pie} interval={interval} statType={statType} />
						</Box>
					</Grid>
				</Grid>
				<Grid item container direction="column" xs={6}>
					<Grid item>
						<Box
							component={Paper}
							display="flex"
							justifyContent="space-between"
							p={2.4}
							sx={{ borderTop: 10, borderColor: "#ee5253" }}
						>
							<Typography variant="h4">User Overlap (7D)</Typography>
						</Box>
					</Grid>
					<Grid item>
						<Box component={Paper} sx={{ height: "60vh" }}>
							<Chord labels={chord.labels} data={chord.data} />
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item></Grid>
		</Grid>
	)
}

export default Platforms
