import { api } from "encore.dev/api";

export const hello = api(
	{
		method: "GET",
		path: "/hello",
		expose: true,
	},
	(): { msg: string } => {
		return { msg: "Hello, World!" };
	},
);
