import { SQLDatabase } from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = new SQLDatabase("auth", {
	migrations: {
		path: "migrations",
	},
});

const orm = drizzle(db.connectionString);
export default orm;
