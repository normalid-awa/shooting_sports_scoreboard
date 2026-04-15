import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "cloudflare:workers";
import orm from "@/orm";
import * as authTables from "@/database/schemas/auth";

export const auth = () =>
	betterAuth({
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
		appName: "Shooting Sports Scoreboard",
		database: drizzleAdapter(orm(), {
			provider: "pg",
			transaction: true,
			schema: {
				account: authTables.account,
				session: authTables.session,
				user: authTables.user,
				verification: authTables.verification,
			},
		}),
		emailAndPassword: {
			enabled: true,
			autoSignIn: true,
		},
	});
