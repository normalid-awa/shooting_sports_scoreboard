import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "./auth";

export const getIsomorphicSession = createIsomorphicFn()
	.client(async () => await authClient.getSession())
	.server(
		async () =>
			await authClient.getSession({
				fetchOptions: {
					headers: getRequestHeaders(),
				},
			}),
	);
