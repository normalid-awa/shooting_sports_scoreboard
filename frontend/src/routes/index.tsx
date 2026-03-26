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
	return (
		<main>
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
