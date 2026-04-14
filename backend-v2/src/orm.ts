import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/node-postgres";

const orm = drizzle({
	connection: {
		connectionString: env.PG_URL,
	},
});

export default orm;
