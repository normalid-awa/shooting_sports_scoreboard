import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, type MouseEventHandler } from "react";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { useMatches } from "@tanstack/react-router";
import UserCardMenu from "./UserCardMenu";

export interface LayoutProps {
	children: React.ReactNode;
	fold: boolean;
	setFold: (fold: boolean) => void;
	onUserCardClick: MouseEventHandler<HTMLButtonElement>;
	title: string;
}

declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		pageTitle?: string;
	}
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const useMobileLayout = useMediaQuery(theme.breakpoints.down("sm"));
	const [fold, setFold] = useState(!useMobileLayout);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openMenu = Boolean(anchorEl);

	const title = useMatches()
		.filter((m) => m.staticData?.pageTitle)
		.map((m) => m.staticData?.pageTitle)
		.join("▸");

	const onUserCardClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<>
			<UserCardMenu
				open={openMenu}
				onClose={() => setAnchorEl(null)}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: useMobileLayout ? "left" : "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: useMobileLayout ? "left" : "right",
				}}
			/>
			{useMobileLayout ? (
				<MobileLayout
					fold={fold}
					setFold={setFold}
					title={title}
					onUserCardClick={onUserCardClick}
				>
					{children}
				</MobileLayout>
			) : (
				<DesktopLayout
					fold={fold}
					setFold={setFold}
					title={`Shooting Sports Scoreboard | ${title}`}
					onUserCardClick={onUserCardClick}
				>
					{children}
				</DesktopLayout>
			)}
		</>
	);
}
