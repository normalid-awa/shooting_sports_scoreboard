import { betterAuth } from "better-auth";
import orm from "./database";
import { env } from "../env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./schema";

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	basePath: "/auth",
	trustedOrigins: env.TRUSTED_ORIGIN.split(","),
	baseURL: {
		allowedHosts: env.TRUSTED_ORIGIN.split(","),
		protocol: "auto",
	},
	advanced: {
		cookiePrefix: "shooting-sports-scoreboard",
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
		},
	},
	database: drizzleAdapter(orm, {
		provider: "pg",
		usePlural: true,
		transaction: true,
		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
});
