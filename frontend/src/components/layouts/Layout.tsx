import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";
import { useMatches } from "@tanstack/react-router";
import { useSession } from "#/integrations/better-auth/auth";
import { useLoginModal } from "#/hooks/loginModalHooks";

export interface LayoutProps {
	children: React.ReactNode;
	fold: boolean;
	setFold: (fold: boolean) => void;
	onUserCardClick: () => void;
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
	const { user } = useSession();
	const { openLoginModal } = useLoginModal();

	const title = [
		"IPSC Scoreboard",
		...useMatches()
			.filter((m) => m.staticData?.pageTitle)
			.map((m) => m.staticData?.pageTitle),
	].join(" | ");

	function onUserCardClick() {
		if (user) {
			//TODO:
		} else {
			openLoginModal();
		}
	}

	if (!useMobileLayout) {
		return (
			<DesktopLayout
				fold={fold}
				setFold={setFold}
				title={title}
				onUserCardClick={onUserCardClick}
			>
				{children}
			</DesktopLayout>
		);
	} else {
		return (
			<MobileLayout
				fold={fold}
				setFold={setFold}
				title={title}
				onUserCardClick={onUserCardClick}
			>
				{children}
			</MobileLayout>
		);
	}
}
