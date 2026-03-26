import { Config } from "drizzle-kit";

export default {
	out: "migrations",
	schema: "schema.ts",
	dialect: "postgresql",
} satisfies Config;
