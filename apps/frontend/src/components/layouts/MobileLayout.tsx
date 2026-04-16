import type { LayoutProps } from "./Layout";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NavList from "./NavList";
import UserCard from "./UserCard";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function MobileLayout(props: LayoutProps) {
	const showAppBar = useScrollTrigger({});

	return (
		<>
			<SwipeableDrawer
				anchor="left"
				open={!props.fold}
				onClose={() => props.setFold(true)}
				onOpen={() => props.setFold(false)}
			>
				<Stack divider={<Divider />} spacing={1} sx={{ width: 200 }}>
					<Toolbar sx={{ p: 0, width: "100%" }}>
						<UserCard onClick={props.onUserCardClick} />
					</Toolbar>
					<NavList onNav={() => props.setFold(true)} />
				</Stack>
			</SwipeableDrawer>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Slide appear={false} in={!showAppBar} direction="down">
					<AppBar>
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={() => props.setFold(!props.fold)}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1 }}
							>
								{props.title}
							</Typography>
						</Toolbar>
					</AppBar>
				</Slide>
				<Toolbar />
				{props.children}
			</Paper>
		</>
	);
}
