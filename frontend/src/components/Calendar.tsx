import { ResponsiveCalendar } from "@nivo/calendar"

interface Props {
	data: any[]
}

function Calendar({ data }: Props) {
	console.log(data)
	return (
		<ResponsiveCalendar
			data={data}
			from={data.length == 0 ? "2021-04-27" : data[0].day}
			to={data.length == 0 ? "2021-04-27" : data[data.length - 1].day}
			emptyColor="#EBEDF0"
			colors={["#f6b3b3", "#e68384", "#ef7a7b", "#ed6768", "#e84142", "#ba3435"]}
			margin={{ top: 40, right: 40, bottom: 20, left: 40 }}
			yearSpacing={40}
			monthBorderColor="#ffffff"
			dayBorderWidth={2}
			dayBorderColor="#ffffff"
		/>
	)
}
export default Calendar
