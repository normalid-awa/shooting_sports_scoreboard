import { Migration } from "@mikro-orm/migrations";

export class Migration20260515084807 extends Migration {
	override up(): void | Promise<void> {
		this.addSql(
			`create table "user" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" boolean not null default false, "image" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`,
		);
		this.addSql(
			`alter table "user" add constraint "user_email_unique" unique ("email");`,
		);

		this.addSql(
			`create table "shooter_profile" ("id" uuid not null, "name" varchar(255) null, "sport" text not null, "identifier" varchar(255) not null, "user_id" uuid null, primary key ("id"));`,
		);
		this.addSql(
			`alter table "shooter_profile" add constraint "shooter_profile_sport_identifier_unique" unique ("sport", "identifier");`,
		);
		this.addSql(
			`alter table "shooter_profile" add constraint "shooter_profile_sport_check" check ("sport" in ('AAIPSC', 'IPSC', 'IDPA', '3-Guns', 'USPSA'));`,
		);

		this.addSql(
			`create table "session" ("id" uuid not null, "expires_at" timestamptz not null, "token" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "ip_address" varchar(255) null, "user_agent" varchar(255) null, "user_id" uuid not null, primary key ("id"));`,
		);
		this.addSql(
			`alter table "session" add constraint "session_token_unique" unique ("token");`,
		);

		this.addSql(
			`create table "account" ("id" uuid not null, "account_id" varchar(255) not null, "provider_id" varchar(255) not null, "user_id" uuid not null, "access_token" varchar(255) null, "refresh_token" varchar(255) null, "id_token" varchar(255) null, "access_token_expires_at" timestamptz null, "refresh_token_expires_at" timestamptz null, "scope" varchar(255) null, "password" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`,
		);

		this.addSql(
			`create table "verification" ("id" uuid not null, "identifier" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`,
		);

		this.addSql(
			`alter table "shooter_profile" add constraint "shooter_profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on delete set null;`,
		);

		this.addSql(
			`alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id");`,
		);

		this.addSql(
			`alter table "account" add constraint "account_user_id_foreign" foreign key ("user_id") references "user" ("id");`,
		);
	}
}
