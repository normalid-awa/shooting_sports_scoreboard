// auth/handler.ts
import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { auth } from "./auth";
import { Session } from "better-auth";

interface AuthParams {
	authorization: Header<"Authorization">;
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
}

export const handler = authHandler<AuthParams, AuthData>(async (params) => {
	const headers = new Headers();
	if (params.authorization) {
		headers.set("Authorization", params.authorization);
	}
	if (params.cookie) {
		headers.set("Cookie", params.cookie);
	}

	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw APIError.unauthenticated("invalid session");
	}

	return { userID: session.user.id, user: session.user };
});

export const authGateway = new Gateway({ authHandler: handler });
