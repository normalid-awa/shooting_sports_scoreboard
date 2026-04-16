import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
	component: RouteComponent,
	staticData: {
		pageTitle: "Account",
	},
});

function RouteComponent() {
	return <Outlet />;
}
