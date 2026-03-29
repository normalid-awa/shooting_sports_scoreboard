import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { useChildMatches } from "@tanstack/react-router";

export interface LayoutProps {
	children: React.ReactNode;
	fold: boolean;
	setFold: (fold: boolean) => void;
	title: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const useMobileLayout = useMediaQuery(theme.breakpoints.down("sm"));
	const [fold, setFold] = useState(!useMobileLayout);
	const routes = useChildMatches();

	if (!useMobileLayout) {
		return (
			<DesktopLayout
				fold={fold}
				setFold={setFold}
				title={
					routes[0].meta?.find((meta) => meta?.title)?.title ||
					"IPSC Scoreboard"
				}
			>
				{children}
			</DesktopLayout>
		);
	} else {
		return (
			<MobileLayout
				fold={fold}
				setFold={setFold}
				title={
					routes[0].meta?.find((meta) => meta?.title)?.title ||
					"IPSC Scoreboard"
				}
			>
				{children}
			</MobileLayout>
		);
	}
}
