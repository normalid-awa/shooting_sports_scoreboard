import { Config } from "drizzle-kit";

const defaultDrizzleConfig = {
	out: "migrations",
	schema: "schema.ts",
	dialect: "postgresql",
} satisfies Config;

export default defaultDrizzleConfig;
