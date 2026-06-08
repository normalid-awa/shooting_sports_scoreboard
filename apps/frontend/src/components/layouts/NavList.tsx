import { Link } from "#/integrations/mui/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { linkOptions } from "@tanstack/react-router";
import HomeIcon from "@mui/icons-material/Home";
import TimerIcon from "@mui/icons-material/Timer";
import PeopleIcon from "@mui/icons-material/People";

const links = linkOptions([
	{
		to: "/",
		label: "Home",
		icon: <HomeIcon />,
	},
	{
		to: "/shooter-profiles",
		label: "Shooter Profiles",
		icon: <PeopleIcon />,
	},
	{
		to: "/timer",
		label: "Timer",
		icon: <TimerIcon />,
	},
]);

export default function NavList(props: { onNav?: () => void }) {
	return (
		<List component="nav" sx={{ width: 220 }} disablePadding>
			{links.map((link) => (
				<ListItemButton
					key={link.to}
					component={Link}
					{...link}
					underline="hover"
					sx={{
						color: "inherit",
						"&[data-status='active']": {
							bgcolor: (theme) =>
								theme.vars?.palette.Switch.infoDisabledColor,
						},
					}}
					onClick={() => props.onNav?.()}
					viewTransition
				>
					<ListItemIcon>{link.icon}</ListItemIcon>
					<ListItemText primary={link.label} />
				</ListItemButton>
			))}
		</List>
	);
}
