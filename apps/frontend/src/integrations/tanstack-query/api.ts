import { env } from "#/env";
import { treaty } from "@elysiajs/eden";
import type { App } from "@shooting_sports_scoreboard/backend";

export const client = treaty<App>(env.VITE_BACKEND_ENDPOINT, {
	throwHttpError: (response) => {
		return response.status.toString()[0] !== "2" && response.status !== 401;
	},
});
