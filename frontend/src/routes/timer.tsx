import Timer from "#/components/timer/Timer";
import Box from "@mui/material/Box";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/timer")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Shooting Sports Scoreboard | Timer",
			},
		],
	}),
	staticData: {
		pageTitle: "Timer",
	},
});

function RouteComponent() {
	return (
		<Box sx={{ p: 2 }}>
			<Timer />
		</Box>
	);
}
