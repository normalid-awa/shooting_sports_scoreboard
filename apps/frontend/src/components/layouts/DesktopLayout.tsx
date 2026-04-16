import Paper from "@mui/material/Paper";
import type { LayoutProps } from "./Layout";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import NavList from "./NavList";
import UserCard from "./UserCard";

export default function DesktopLayout(props: LayoutProps) {
	return (
		<Box sx={{ display: "flex" }}>
			<Collapse
				in={!props.fold}
				orientation="horizontal"
				collapsedSize="56px"
				sx={{
					position: "sticky",
					top: 0,
					height: "100vh",
				}}
			>
				<Paper
					elevation={5}
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Toolbar />
					<Divider />
					<NavList />
				</Paper>
			</Collapse>
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<AppBar position="sticky" sx={{ top: 0 }}>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={() => props.setFold(!props.fold)}
						>
							{props.fold ? <MenuIcon /> : <MenuOpenIcon />}
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							{props.title}
						</Typography>
						<Box
							sx={{
								height: "100%",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Paper variant="outlined">
								<UserCard onClick={props.onUserCardClick} />
							</Paper>
						</Box>
					</Toolbar>
				</AppBar>
				<Paper sx={{ m: 0, p: 0, flexGrow: 1 }} variant="outlined">
					{props.children}
				</Paper>
			</Box>
		</Box>
	);
}
