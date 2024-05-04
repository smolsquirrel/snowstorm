import { ResponsiveHeatMap } from "@nivo/heatmap"

interface Props {
	data: any[]
}
function HeatMap({ data }: Props) {
	return (
		<ResponsiveHeatMap
			data={data}
			margin={{ top: 40, right: 90, bottom: 60, left: 90 }}
			valueFormat=" >+.1%"
			axisTop={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "",
				format: (v) => {
					return v.length > 10 ? v.substring(0, 10) + "..." : v
				},
			}}
			axisRight={{
				tickSize: 7,
				tickPadding: 5,
				tickRotation: 0,
				legend: "",
			}}
			axisLeft={{
				tickSize: 7,
				tickPadding: 5,
				tickRotation: 0,
				legend: "",
			}}
			colors={{
				type: "sequential",
				scheme: "red_yellow_green",
				minValue: -1,
				maxValue: 1,
			}}
			emptyColor="#555555"
			legends={[
				{
					anchor: "bottom",
					translateX: 0,
					translateY: 30,
					length: 400,
					thickness: 13,
					direction: "row",
					tickPosition: "after",
					tickSize: 3,
					tickSpacing: 4,
					tickOverlap: false,
					tickFormat: ">-.0%",
					title: "Percent change →",
					titleAlign: "middle",
					titleOffset: 4,
				},
			]}
		/>
	)
}
export default HeatMap
