import Menu, { type MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuList from "@mui/material/MenuList";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { authClient, useSession } from "#/integrations/better-auth/auth";
import { Divider } from "@mui/material";
import ThemeSwitch from "../ThemeSwitch";
import { useConfirm } from "material-ui-confirm";
import { useLoginModal } from "#/hooks/loginModalHooks";
import { useNavigate } from "@tanstack/react-router";
import FullScreenCircularProgress from "../FullScreenCircularProgress";
import { useState } from "react";

function LoggedOutMenuItems() {
	const { openLoginModal } = useLoginModal();

	return (
		<MenuItem onClick={openLoginModal}>
			<ListItemIcon>
				<LoginIcon />
			</ListItemIcon>
			<ListItemText>Login</ListItemText>
		</MenuItem>
	);
}

function LoggedInMenuItems() {
	const [loading, setLoading] = useState(false);
	const confirm = useConfirm();
	const navigate = useNavigate();

	async function logout() {
		if (
			!(
				await confirm({
					title: "Confirm Logout",
					description: "Are you sure you want to log out?",
				})
			).confirmed
		) {
			return;
		}
		setLoading(true);
		const result = await authClient.signOut();
		if (result.error) {
			console.error(result.error);
			confirm({
				title: `Logout Failed ${result.error.statusText}`,
				description: result.error.message,
				hideCancelButton: true,
			});
			return;
		}
		setLoading(false);
		await confirm({
			title: "Logged Out",
			description: "You have been logged out successfully.",
			hideCancelButton: true,
		});
		navigate({ to: ".", reloadDocument: true });
	}

	return (
		<>
			<FullScreenCircularProgress showLoading={loading} />
			<MenuItem onClick={logout}>
				<ListItemIcon>
					<LogoutIcon />
				</ListItemIcon>
				<ListItemText>Logout</ListItemText>
			</MenuItem>
		</>
	);
}

function CommonMenuItems() {
	return <ThemeSwitch sx={{ width: 250, mx: 1 }} />;
}

export default function UserCardMenu(props: MenuProps) {
	const { user } = useSession();

	return (
		<Menu {...props}>
			<MenuList sx={{ py: 0 }}>
				<CommonMenuItems />
				<Divider sx={{ my: 1 }} />
				{user ? <LoggedInMenuItems /> : <LoggedOutMenuItems />}
			</MenuList>
		</Menu>
	);
}
