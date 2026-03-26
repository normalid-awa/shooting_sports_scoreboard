import { betterAuth } from "better-auth";
import { db } from "./database";
import { Pool } from "pg";
import { env } from "../env";

const pool = new Pool({
	connectionString: db.connectionString,
});

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	basePath: "/auth",
	database: pool,
	emailAndPassword: {
		enabled: true,
	},
});
