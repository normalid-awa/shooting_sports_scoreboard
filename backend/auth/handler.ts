import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { auth } from "./auth";

interface AuthParams {
	cookie: Header<"Cookie">;
}

interface AuthData {
	userID: string;
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null | undefined;
	};
	rawCookie: string;
}

export const handler = authHandler<AuthParams, AuthData>(async (params) => {
	const headers = new Headers();
	if (params.cookie) {
		headers.set("Cookie", params.cookie);
	}

	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw APIError.unauthenticated("invalid session");
	}

	return {
		userID: session.user.id,
		user: session.user,
		rawCookie: params.cookie,
	};
});

export const authGateway = new Gateway({ authHandler: handler });
