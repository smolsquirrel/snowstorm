import { ResponsiveLine } from "@nivo/line"

interface Props {
	data: any[]
	interval: string
}

const formatterCompact = Intl.NumberFormat("en-US", {
	notation: "compact",
})

function MultiLine({ data, interval }: Props) {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 50, bottom: 30, left: 50 }}
			xScale={{ type: "time", format: "%Y-%m-%d" }}
			yScale={{
				type: "linear",
				min: 0,
				max: "auto",
				reverse: false,
				stacked: true,
			}}
			curve="cardinal"
			colors={{ scheme: "set3" }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				format: interval === "month" ? "%b %Y" : "%d %b",
				tickValues: interval === "month" ? "every 4 weeks" : "every day",
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
			areaOpacity={0.8}
			useMesh={true}
			crosshairType="cross"
			xFormat="time:%Y-%m-%d"
			legends={[
				{
					anchor: "top-right",
					direction: "column",
					justify: false,
					translateX: 0,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 1,
					symbolSize: 12,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, .5)",
					effects: [
						{
							on: "hover",
							style: {
								itemBackground: "rgba(0, 0, 0, .03)",
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	)
}
export default MultiLine
