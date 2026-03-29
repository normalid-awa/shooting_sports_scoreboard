import { betterAuth } from "better-auth";
import orm from "./database";
import { env } from "../env";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	basePath: "/auth",
	trustedOrigins: env.TRUSTED_ORIGIN.split(","),
	baseURL: {
		allowedHosts: env.TRUSTED_ORIGIN.split(","),
		protocol: "auto",
	},
	advanced: {
		cookiePrefix: "ipsc-scoreboard",
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
		},
	},
	database: drizzleAdapter(orm, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
});
