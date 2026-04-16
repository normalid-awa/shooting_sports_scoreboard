import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/node-postgres";

export default function orm() {
	return drizzle({
		connection: {
			connectionString: env.PG_URL,
		},
	});
}
