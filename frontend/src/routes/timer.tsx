import Timer from "#/components/timer/Timer";
import Box from "@mui/material/Box";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timer")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Box sx={{ p: 2 }}>
			<Timer />
		</Box>
	);
}
