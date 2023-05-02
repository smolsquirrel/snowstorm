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
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: "time", format: "%Y-%m-%d" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				reverse: false,
			}}
			curve="natural"
			colors={{ scheme: "set1" }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: "%b %Y",
				tickValues: "every month",
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
			areaOpacity={0.4}
			useMesh={true}
			xFormat="time:%Y-%m-%d"
		/>
	)
}
export default SimpleLine
