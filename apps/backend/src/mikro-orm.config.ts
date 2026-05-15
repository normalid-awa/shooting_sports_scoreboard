import {
	AbstractSqlConnection,
	AbstractSqlDriver,
	Dictionary,
	Configuration,
	defineConfig,
} from "@mikro-orm/sql";
import { Migrator } from "@mikro-orm/migrations";
import Schemas from "./database/schemas/index.js";
import compiledFunctions from "./database/compiled.js";
import { EntityManagerWithPagination } from "./utils/paginations.js";
import type { Dialect } from "kysely";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { PostgreSqlDriver, PostgreSqlPlatform } from "@mikro-orm/postgresql";
import "dotenv/config";
import isOnWorker from "./utils/isOnWorker.js";

let env: Cloudflare.Env;
if (isOnWorker()) env = (await import("cloudflare:workers")).env;

class HyperdriveConnection extends AbstractSqlConnection {
	createKyselyDialect(overrides: Dictionary): Dialect {
		return new PostgresDialect({
			pool: new Pool({
				connectionString: env.HYPERDRIVE.connectionString,
			}),
		});
	}
}

class HyperdriveDriver extends AbstractSqlDriver<HyperdriveConnection> {
	constructor(config: Configuration) {
		super(config, new PostgreSqlPlatform(), HyperdriveConnection, ["kysely"]);
	}
}

export default defineConfig({
	compiledFunctions,
	clientUrl:
		process.env.CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE,
	entities: Object.values(Schemas),
	migrations: {
		pathTs: "./src/database/migrations",
	},
	extensions: [Migrator],
	debug: true,
	entityManager: EntityManagerWithPagination,
	driver: isOnWorker() ? HyperdriveDriver : PostgreSqlDriver,
});
