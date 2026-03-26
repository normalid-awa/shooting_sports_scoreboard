import { api } from "encore.dev/api";

export const hello = api(
	{
		method: "GET",
		path: "/hello",
	},
	() => {
		return { msg: "Hello, World!" };
	},
);
