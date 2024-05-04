import { ResponsivePie } from "@nivo/pie"

interface Props {
	data: {
		[keys: string]: { [keys: string]: { id: string; label: string; value: number }[] }
	}
	statType: string
	interval: string
}

const formatterCompact = Intl.NumberFormat("en-US", {
	notation: "compact",
})

function Pie({ data, statType, interval }: Props) {
	const d = data[interval][statType]
	return (
		<ResponsivePie
			data={d}
			valueFormat={formatterCompact.format}
			colors={{ scheme: "category10" }}
			margin={{ top: 40, right: 90, bottom: 40, left: 90 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			borderWidth={1}
			borderColor={{
				from: "color",
				modifiers: [["darker", 0.2]],
			}}
			arcLinkLabelsTextColor="#333333"
			arcLinkLabelsThickness={2}
			arcLinkLabelsSkipAngle={3}
			arcLinkLabelsColor={{ from: "color" }}
			arcLinkLabelsDiagonalLength={10}
			arcLinkLabelsStraightLength={30}
			arcLabelsSkipAngle={10}
		/>
	)
}
export default Pie
