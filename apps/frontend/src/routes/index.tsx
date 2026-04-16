import { client } from "#/integrations/tanstack-query/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: [
			{
				title: "Shooting Sports Scoreboard",
			},
			{
				name: "og:description",
				content:
					"A scoreboard for general shooting competitions (IPSC, IDPA, USPSA, 3-Guns, Action Air, etc...).",
			},
		],
	}),
	staticData: {
		pageTitle: "Home",
	},
});

function App() {
	const query = useQuery({
		queryKey: [client.get["~path"]],
		queryFn: () => client.get(),
	});

	return (
		<main>
			<p>
				api call result:
				<a
					dangerouslySetInnerHTML={{
						__html: query.data?.data ?? "loading",
					}}
				></a>
			</p>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
			<h1>Hello, world!</h1>
		</main>
	);
}
