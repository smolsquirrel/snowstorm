import { ResponsiveChord } from "@nivo/chord"

interface Props {
	labels: string[]
	data: any[]
}
function Chord({ labels, data }: Props) {
	return (
		<ResponsiveChord
			data={data}
			keys={labels}
			margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
			valueFormat=".2f"
			padAngle={0.02}
			innerRadiusRatio={0.96}
			innerRadiusOffset={0.02}
			inactiveArcOpacity={0.25}
			arcBorderColor={{
				from: "color",
				modifiers: [["darker", 0.6]],
			}}
			activeRibbonOpacity={0.75}
			inactiveRibbonOpacity={0.1}
			ribbonBorderColor={{
				from: "color",
				modifiers: [["darker", 0.6]],
			}}
			labelRotation={-90}
			labelTextColor={{
				from: "color",
				modifiers: [["darker", 1]],
			}}
			labelOffset={5}
			colors={{ scheme: "category10" }}
			motionConfig="stiff"
			legends={[
				{
					anchor: "left",
					direction: "column",
					justify: false,
					translateX: -20,
					translateY: 0,
					itemWidth: 100,
					itemHeight: 20,
					itemsSpacing: 0,
					symbolSize: 20,
					itemDirection: "left-to-right",
				},
			]}
		/>
	)
}
export default Chord
