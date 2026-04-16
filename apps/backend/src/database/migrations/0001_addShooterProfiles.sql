CREATE TYPE "public"."sports" AS ENUM('AAIPSC', 'IPSC', 'IDPA', '3-Guns', 'USPSA');--> statement-breakpoint
CREATE TABLE "shooter_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"sport" "sports" NOT NULL,
	"userId" text
);
