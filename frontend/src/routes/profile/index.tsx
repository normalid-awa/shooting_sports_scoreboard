import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/")({
	component: RouteComponent,
	staticData: {
		pageTitle: "Profile",
	},
});

function RouteComponent() {
	return <div>Hello "/profile/"!</div>;
}
