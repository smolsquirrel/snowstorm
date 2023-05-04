import { ResponsiveLine } from "@nivo/line"

interface Props {
	data: any[]
	type: string
}
const formatData = (data: any[], type: string) => {
	return [
		{
			id: type,
			data: data,
		},
	]
}
const formatterCompact = Intl.NumberFormat("en-US", {
	notation: "compact",
})

function SimpleLine({ data, type }: Props) {
	return (
		<ResponsiveLine
			data={formatData(data, type)}
			margin={{ top: 50, right: 50, bottom: 30, left: 50 }}
			xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }}
			yScale={{
				type: "linear",
				min: 0,
				max: "auto",
				reverse: false,
			}}
			curve="cardinal"
			colors={{ scheme: "set1" }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: "%b %Y",
				tickValues: "every 4 weeks",
				tickRotation: 0,
				tickSize: 5,
				tickPadding: 5,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				format: formatterCompact.format,
			}}
			enableGridX={false}
			enablePoints={false}
			enableArea={true}
			areaOpacity={0.5}
			useMesh={true}
			crosshairType="cross"
			xFormat="time:%Y-%m-%d"
			yFormat=">-.2f"
		/>
	)
}
export default SimpleLine
