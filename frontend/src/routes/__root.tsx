import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";

import type { QueryClient } from "@tanstack/react-query";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Providers } from "#/providers/Providers";
import { getIsomorphicSession } from "#/integrations/better-auth/getIsomorphicSession";
import { defaultAuthQueryOptions } from "@daveyplate/better-auth-tanstack";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
	}),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: defaultAuthQueryOptions.sessionKey,
			queryFn: async () => await getIsomorphicSession(),
		});
	},
	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Providers>
					<Outlet />
				</Providers>
				<Scripts />
			</body>
		</html>
	);
}
