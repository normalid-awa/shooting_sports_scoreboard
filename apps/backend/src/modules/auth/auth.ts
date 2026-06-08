import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { env } from "cloudflare:workers";
import { Pool } from "pg";

export const auth = () =>
	betterAuth({
		logger: {
			level: "debug",
		},
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
		database: new Pool({ connectionString: env.HYPERDRIVE.connectionString }),
		user: {
			fields: {
				emailVerified: "email_verified",
				createdAt: "created_at",
				updatedAt: "updated_at",
			},
			additionalFields: {
				realname: {
					type: "string",
					required: false,
				},
			},
		},
		session: {
			fields: {
				createdAt: "created_at",
				expiresAt: "expires_at",
				ipAddress: "ip_address",
				updatedAt: "updated_at",
				userAgent: "user_agent",
				userId: "user_id",
			},
		},
		account: {
			fields: {
				accessToken: "access_token",
				accessTokenExpiresAt: "access_token_expires_at",
				accountId: "account_id",
				createdAt: "created_at",
				idToken: "id_token",
				providerId: "provider_id",
				refreshToken: "refresh_token",
				refreshTokenExpiresAt: "refresh_token_expires_at",
				updatedAt: "updated_at",
				userId: "user_id",
			},
		},
		verification: {
			fields: {
				createdAt: "created_at",
				expiresAt: "expires_at",
				updatedAt: "updated_at",
			},
		},
		emailAndPassword: {
			enabled: true,
			autoSignIn: true,
		},
		plugins: [openAPI()],
	});
