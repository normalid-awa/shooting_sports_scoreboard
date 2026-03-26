import { encoreClient } from "#/integrations/tanstack-query/encore-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	head: () => ({
		meta: [
			{
				title: "IPSC Scoreboard",
			},
			{
				name: "og:description",
				content: "A scoreboard for general shooting competitions.",
			},
		],
	}),
});

function App() {
	const query = useQuery({
		queryKey: [encoreClient.hello.hello.name],
		queryFn: () => encoreClient.hello.hello(),
	});

	return (
		<main>
			<p>
				api call result:
				{query.data?.msg ?? "loading"}
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
