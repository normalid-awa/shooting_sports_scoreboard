import { TodoPlaceHolder } from "#/components/TodoPlaceHolder";
import Stack from "@mui/material/Stack";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shooter-profiles/")({
	component: RouteComponent,
	staticData: {
		pageTitle: "Shooter Profiles",
	},
});

function RouteComponent() {
	return (
		<Stack spacing={2} sx={{ p: 2 }}>
			<TodoPlaceHolder featureName="User's shooter profile" />
			<TodoPlaceHolder featureName="Shooter Profile list" />
		</Stack>
	);
}
