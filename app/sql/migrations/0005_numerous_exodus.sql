CREATE TYPE "public"."product_stages" AS ENUM('idea', 'prototype', 'mvp', 'launched');

CREATE TABLE "teams" (
	"team_id" uuid PRIMARY KEY NOT NULL,
	"product_name" text NOT NULL,
	"team_size" integer NOT NULL,
	"equity_split" integer NOT NULL,
	"product_stage" "product_stages" NOT NULL,
	"roles" text NOT NULL,
	"product_description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_size_check" CHECK ("teams"."team_size" BETWEEN 1 AND 100),
	CONSTRAINT "equity_split_check" CHECK ("teams"."equity_split" BETWEEN 1 AND 100),
	CONSTRAINT "product_description_check" CHECK (LENGTH("teams"."product_description") <= 200)
);
