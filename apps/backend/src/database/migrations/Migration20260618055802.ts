import { Migration } from '@mikro-orm/migrations';

export class Migration20260618055802 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create type "sport" as enum ('AAIPSC', 'IPSC', 'IDPA', '3-Guns', 'USPSA');`);
    this.addSql(`create type "region" as enum ('AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'CPV', 'KHM', 'CMR', 'CAN', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'SWZ', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MKD', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE');`);
    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" boolean not null, "image" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "realname" varchar(255) null, primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "shooter_profile" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "sport" "sport" not null, "region" "region" not null, "identifier" varchar(255) not null, "user_id" uuid not null, "sport_specific_data" jsonb null, "created_at" timestamptz not null default current_timestamp, primary key ("id"));`);

    this.addSql(`create table "session" ("id" uuid not null default gen_random_uuid(), "expires_at" timestamptz not null, "token" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "ip_address" varchar(255) null, "user_agent" varchar(255) null, "user_id" uuid not null, primary key ("id"));`);
    this.addSql(`alter table "session" add constraint "session_token_unique" unique ("token");`);

    this.addSql(`create table "account" ("id" uuid not null default gen_random_uuid(), "account_id" varchar(255) not null, "provider_id" varchar(255) not null, "user_id" uuid not null, "access_token" varchar(255) null, "refresh_token" varchar(255) null, "id_token" varchar(255) null, "access_token_expires_at" timestamptz null, "refresh_token_expires_at" timestamptz null, "scope" varchar(255) null, "password" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`create table "verification" ("id" uuid not null default gen_random_uuid(), "identifier" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`alter table "shooter_profile" add constraint "shooter_profile_user_id_foreign" foreign key ("user_id") references "user" ("id");`);

    this.addSql(`alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id");`);

    this.addSql(`alter table "account" add constraint "account_user_id_foreign" foreign key ("user_id") references "user" ("id");`);
  }

}
