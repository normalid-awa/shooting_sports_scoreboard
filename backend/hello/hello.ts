import { api } from "encore.dev/api";
import { getAuthData } from "~encore/auth";

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

interface ProfileResponse {
	userId: string;
}

export const protectedApi = api(
	{ auth: true, expose: true, method: "GET", path: "/profile" },
	async (): Promise<ProfileResponse> => {
		const data = getAuthData()!;
		return { userId: data.userID };
	},
);
