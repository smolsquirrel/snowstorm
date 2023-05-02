import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import BarChartIcon from "@mui/icons-material/BarChart"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import Grid from "@mui/material/Grid"

import StatsCard from "../components/StatsCard"
import { Stats } from "../pages/Home"

interface Props {
	data: Stats
}

function HomeStats({ data }: Props) {
	return (
		<Grid container spacing={10}>
			<Grid item xs={4}>
				<StatsCard
					title="Volume"
					value={data["VOLUME"]}
					interval="past 24H"
					icon={<BarChartIcon />}
					isCurrency={true}
				/>
			</Grid>
			<Grid item xs={4}>
				<StatsCard
					title="Users"
					value={data["USERS"]}
					interval="past 24H"
					icon={<AccountCircleIcon />}
					isCurrency={false}
				/>
			</Grid>
			<Grid item xs={4}>
				<StatsCard
					title="Swaps"
					value={data["SWAPS"]}
					interval="past 24H"
					icon={<SwapHorizIcon />}
					isCurrency={false}
				/>
			</Grid>
		</Grid>
	)
}
export default HomeStats
