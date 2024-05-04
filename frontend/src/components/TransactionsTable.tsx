import Link from "@mui/material/Link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

interface Props {
	data: any[]
}

const columns = [
	"Date",
	"Platform",
	"Token In",
	"Amount In",
	"Token Out",
	"Amount Out",
	"User",
	"Tx",
]

const formatDate = (dateString: string) => {
	const date = new Date(dateString.slice(0, 19).replace(/ /g, "T") + "+00:00")
	return date.toLocaleString()
}

function TransactionsTable({ data }: Props) {
	return (
		<TableContainer sx={{ maxHeight: 440 }}>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column}>{column}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((tx) => (
						<TableRow key={tx.TX_HASH + tx.AMOUNT_IN + tx.AMOUNT_OUT}>
							<TableCell>{formatDate(tx.DATE)}</TableCell>
							<TableCell>{tx.PLATFORM}</TableCell>
							<TableCell>{tx.SYMBOL_IN}</TableCell>
							<TableCell>{tx.AMOUNT_IN}</TableCell>
							<TableCell>{tx.SYMBOL_OUT}</TableCell>
							<TableCell>{tx.AMOUNT_OUT}</TableCell>
							<TableCell>{tx.USER.slice(0, 5) + "..." + tx.USER.slice(37)}</TableCell>
							<TableCell>
								<Link
									href={
										"https://snowtrace.io/tx/" + tx.TX_HASH + "?chainId=43114"
									}
									target="_blank"
									rel="noreferrer"
								>
									{tx.TX_HASH.slice(0, 5)}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export default TransactionsTable
