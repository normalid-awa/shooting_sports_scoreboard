import { betterAuth } from "better-auth";
import { env } from "cloudflare:workers";
import orm from "@/database/orm.js";
import { mikroOrmAdapter } from "better-auth-mikro-orm";

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
			database: {
				generateId: false,
			},
		},
		appName: "Shooting Sports Scoreboard",
		database: mikroOrmAdapter(orm()),
		emailAndPassword: {
			enabled: true,
			autoSignIn: true,
		},
	});
