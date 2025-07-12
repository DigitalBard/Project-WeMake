ALTER TABLE "products" DROP CONSTRAINT "products_to_profile_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_to_profiles_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;