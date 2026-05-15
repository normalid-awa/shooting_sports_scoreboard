import { defineConfig } from "@mikro-orm/postgresql";
import Schemas from "./database/schemas/index.js";
import "dotenv/config";
import compiledFunctions from "./database/compiled.js";
import { Migrator } from "@mikro-orm/migrations";

export default defineConfig({
	compiledFunctions,
	clientUrl: process.env.PG_URL,
	entities: Object.values(Schemas),
	migrations: {
		pathTs: "./src/database/migrations",
	},
	extensions: [Migrator],
	debug: true,
});
