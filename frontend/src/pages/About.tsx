import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

function About() {
	return (
		<Container>
			<Typography variant="body1" textAlign="justify">
				All of the data is sourced from avalanche.defi.ez_dex_swaps on Flipside. However,
				due to the limitations of the API's free tier query seconds, it was not feasible to
				obtain the required data through the API. To work around this, I wrote the queries
				directly on Flipside, scheduled them to refresh every 3 hours, and used the
				resulting tables for querying. Although the data may not be up-to-date, this is not
				a significant issue for our analysis as a 3-hour difference is insignificant for the
				purposes of our analysis. Additionally, Flipside itself is not real-time as it
				requires time to index on-chain data. Using queries hosted on Flipside has its
				drawbacks, such as the inability to make specific input queries. More query seconds
				would allow for additional features such as having an account page directly in
				Snowstorm, more sophisticated dataviz and statistics not available on Flipside.
				Specific pages for each dex/pool/asset with more detailed charts and statistics
				would also be possible. The most powerful feature of specific input queries is the
				ability to connect everything together. For example, the specific page for Curve
				would have its most used assets. By clicking on an asset, you can then visit its
				specific page, which displays its most popular pools and dexes that you can also
				click on and visit. This process can be repeated for other assets,pools and
				platforms, creating a comprehensive and interconnected data dashboard.
			</Typography>
			<br></br>
			<Typography variant="body1" textAlign="justify">
				Notes:
			</Typography>
			<br></br>
			<Typography variant="body1" textAlign="justify">
				Volume is calculated using amount_in_usd, except for the Assets page, where it uses
				amount_out_usd. This is because we want to know about the asset being swapped into
				(token out), and not the asset being swapped (token in).
			</Typography>
			<br></br>
			<Typography variant="body1" textAlign="justify">
				Time ranges go up to the previous day, not the current one. For example, the past 30
				days isn't from 30 days ago to today, but from 31 days ago to 1 day ago. This is
				because it takes time for on-chain data to be indexed, so there is usually a lot of
				missing data for the current day.
			</Typography>
			<br></br>
			<Typography variant="body1" textAlign="justify">
				Links:
			</Typography>
			<Typography variant="body1" textAlign="justify">
				Site's code:
				<a
					href="https://github.com/0xMimi/snowstorm"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://github.com/0xMimi/snowstorm
				</a>
			</Typography>
			<Typography variant="body1" textAlign="justify">
				Tables and queries:
				<a
					href="https://flipsidecrypto.xyz/0xmimi/snowstorm-tables-and-queries-1XMA6X"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://flipsidecrypto.xyz/0xmimi/snowstorm-tables-and-queries-1XMA6X
				</a>
			</Typography>
		</Container>
	)
}
export default About
