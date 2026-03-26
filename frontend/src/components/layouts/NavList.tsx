import { Link } from "#/integrations/mui/Link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { linkOptions } from "@tanstack/react-router";
import HomeIcon from "@mui/icons-material/Home";

const links = linkOptions([
	{
		to: "/",
		label: "Home",
		icon: <HomeIcon />,
	},
]);

export default function NavList() {
	return (
		<List component="nav" sx={{ width: 200 }}>
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
					viewTransition
				>
					<ListItemIcon>{link.icon}</ListItemIcon>
					<ListItemText primary={link.label} />
				</ListItemButton>
			))}
		</List>
	);
}
