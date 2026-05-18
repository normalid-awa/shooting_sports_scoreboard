import { Migration } from "@mikro-orm/migrations";

export class Migration20260515103122_AddDefaultValueToAuthTable extends Migration {
	override up(): void | Promise<void> {
		this.addSql(
			`alter table "user" alter column "id" set default gen_random_uuid();`,
		);

		this.addSql(
			`alter table "session" alter column "id" set default gen_random_uuid();`,
		);

		this.addSql(
			`alter table "account" alter column "id" set default gen_random_uuid();`,
		);

		this.addSql(
			`alter table "verification" alter column "id" set default gen_random_uuid();`,
		);
	}

	override down(): void | Promise<void> {
		this.addSql(`alter table "account" alter column "id" drop default;`);

		this.addSql(`alter table "session" alter column "id" drop default;`);

		this.addSql(`alter table "user" alter column "id" drop default;`);

		this.addSql(`alter table "verification" alter column "id" drop default;`);
	}
}
