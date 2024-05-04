import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"

interface Props {
	text: string
	statType: string
	interval: string
	handleInterval: (event: React.MouseEvent<any>, value: any) => void
	handleStat: (event: React.MouseEvent<any>, value: any) => void
	disable: boolean
}

function OptionsBar({ text, statType, interval, handleInterval, handleStat, disable }: Props) {
	return (
		<Box
			component={Paper}
			display="flex"
			justifyContent="space-between"
			p={2}
			sx={{ borderTop: 10, borderColor: "#ee5253" }}
		>
			<Typography variant="h4">{text}</Typography>
			<Box display="flex">
				<ToggleButtonGroup exclusive value={interval} onChange={handleInterval}>
					<ToggleButton value="thirty" disabled={interval === "thirty" || disable}>
						30D
					</ToggleButton>
					<ToggleButton value="seven" disabled={interval === "seven" || disable}>
						7D
					</ToggleButton>
				</ToggleButtonGroup>
				<Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
				<ToggleButtonGroup exclusive value={statType} onChange={handleStat}>
					<ToggleButton value="VOLUME" disabled={statType === "VOLUME" || disable}>
						Volume
					</ToggleButton>
					<ToggleButton value="USERS" disabled={statType === "USERS" || disable}>
						Users
					</ToggleButton>
					<ToggleButton value="SWAPS" disabled={statType === "SWAPS" || disable}>
						Swaps
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
		</Box>
	)
}
export default OptionsBar
