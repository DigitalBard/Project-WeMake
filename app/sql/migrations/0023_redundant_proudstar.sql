ALTER TABLE "jobs" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "registered_by" uuid;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_registered_by_profiles_profile_id_fk" FOREIGN KEY ("registered_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "job-insert-policy" ON "jobs" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "jobs"."registered_by");--> statement-breakpoint
CREATE POLICY "job-select-policy" ON "jobs" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "job-update-policy" ON "jobs" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "jobs"."registered_by") WITH CHECK ((select auth.uid()) = "jobs"."registered_by");--> statement-breakpoint
CREATE POLICY "job-delete-policy" ON "jobs" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "jobs"."registered_by");