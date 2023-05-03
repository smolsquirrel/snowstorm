import { ResponsiveBump } from "@nivo/bump"

interface Props {
	data: any[]
}

function Bump({ data }: Props) {
	return (
		<ResponsiveBump
			data={data}
			colors={{ scheme: "category10" }}
			xOuterPadding={0.2}
			lineWidth={5}
			activeLineWidth={8}
			inactiveLineWidth={4}
			inactiveOpacity={0.2}
			pointSize={7}
			activePointSize={9}
			inactivePointSize={0}
			pointBorderWidth={1}
			activePointBorderWidth={4}
			enableGridX={false}
			axisTop={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Ranking",
				legendPosition: "middle",
				legendOffset: -40,
			}}
			motionConfig="default"
			margin={{ top: 20, right: 100, bottom: 40, left: 60 }}
			axisRight={null}
		/>
	)
}
export default Bump
