import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface Props {
	title: string
	value: number
	interval: string
	icon: React.ReactNode
	isCurrency: boolean
}

const formatter = Intl.NumberFormat("en-US", {
	maximumFractionDigits: 0,
})

function StatsCard({ title, value, interval, icon, isCurrency }: Props) {
	return (
		<Card sx={{ borderTop: 10, borderColor: "#ee5253", borderRadius: 2, pb: 2 }}>
			<CardContent>
				<Grid container direction="column" spacing={2}>
					<Grid item>
						<Box display="flex" justifyContent="space-between">
							<Typography variant="h5">
								{title} ({interval})
							</Typography>
							<>{icon}</>
						</Box>
					</Grid>
					<Grid item>
						<Typography variant="h3">
							{isCurrency ? "$" : ""}
							{formatter.format(value)}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
export default StatsCard
