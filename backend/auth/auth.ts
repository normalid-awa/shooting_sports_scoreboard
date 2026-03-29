import { betterAuth } from "better-auth";
import { db } from "./database";
import { Pool } from "pg";
import { env } from "../env";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const pool = new Pool({
	connectionString: db.connectionString,
});

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
	database: pool,
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
});
