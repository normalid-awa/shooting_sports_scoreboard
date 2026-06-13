import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export function useResponsiveLayout() {
	const theme = useTheme();
	const enableMobileLayout = useMediaQuery(theme.breakpoints.down("sm"));
	const shouldAttractToolbar = useScrollTrigger({});

	return [enableMobileLayout, shouldAttractToolbar && enableMobileLayout];
}
