import EnsureAuth from "#/integrations/better-auth/EnsureAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/management")({
	component: () => <EnsureAuth component={<RouteComponent />} />,
	head: () => ({
		meta: [{ title: "Shooting Sports Scoreboard | Account management" }],
	}),
	staticData: {
		pageTitle: "Management",
	},
});

function RouteComponent() {
	return <div>Hello "/account/management"!</div>;
}
