import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import HomeIcon from "@mui/icons-material/Home"
import InventoryIcon from "@mui/icons-material/Inventory"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import StoreIcon from "@mui/icons-material/Store"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

const drawerWidth = 220
function Sidebar() {
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					backgroundColor: "#ee5253",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Typography variant="h4" pt={2} pl={2} align="left" color="white">
				Snowstorm
			</Typography>
			<List>
				<ListItem disablePadding sx={{ color: "white" }}>
					<ListItemButton href="/">
						<ListItemIcon>
							<HomeIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>Home</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding sx={{ color: "white" }}>
					<ListItemButton href="/platforms">
						<ListItemIcon>
							<StoreIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>Platforms</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding sx={{ color: "white" }}>
					<ListItemButton href="/pools">
						<ListItemIcon>
							<InventoryIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>Pools</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding sx={{ color: "white" }}>
					<ListItemButton href="/assets">
						<ListItemIcon>
							<MonetizationOnIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>Assets</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding sx={{ color: "white" }}>
					<ListItemButton href="/account">
						<ListItemIcon>
							<AccountCircleIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>Account</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	)
}

export default Sidebar
