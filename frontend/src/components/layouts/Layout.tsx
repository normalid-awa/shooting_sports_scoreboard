import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

export interface LayoutProps {
	children: React.ReactNode;
	fold: boolean;
	setFold: (fold: boolean) => void;
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const theme = useTheme();
	const useMobileLayout = useMediaQuery(theme.breakpoints.down("sm"));
	const [fold, setFold] = useState(!useMobileLayout);

	if (!useMobileLayout) {
		return (
			<DesktopLayout fold={fold} setFold={setFold}>
				{children}
			</DesktopLayout>
		);
	} else {
		return (
			<MobileLayout fold={fold} setFold={setFold}>
				{children}
			</MobileLayout>
		);
	}
}
