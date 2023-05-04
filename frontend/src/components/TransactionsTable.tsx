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
						<TableRow key={tx.tx_hash + tx.amount_in + tx.amount_out}>
							<TableCell>{formatDate(tx.date)}</TableCell>
							<TableCell>{tx.platform}</TableCell>
							<TableCell>{tx.symbol_in}</TableCell>
							<TableCell>{tx.amount_in}</TableCell>
							<TableCell>{tx.symbol_out}</TableCell>
							<TableCell>{tx.amount_out}</TableCell>
							<TableCell>{tx.user.slice(0, 5) + "..." + tx.user.slice(37)}</TableCell>
							<TableCell>
								<Link
									href={"https://snowtrace.io/tx/" + tx.tx_hash}
									target="_blank"
									rel="noreferrer"
								>
									{tx.tx_hash.slice(0, 5)}
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
