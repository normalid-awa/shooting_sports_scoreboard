import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "cloudflare:workers";
import orm from "@/orm";

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
	}),
	emailAndPassword: {
		enabled: true,
	},
});
