ALTER TABLE "post_replies" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "post_upvotes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "topics" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "registered_by" SET NOT NULL;--> statement-breakpoint
CREATE POLICY "post-reply-select-policy" ON "post_replies" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "post-reply-insert-policy" ON "post_replies" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "post_replies"."profile_id");--> statement-breakpoint
CREATE POLICY "post-reply-update-policy" ON "post_replies" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "post_replies"."profile_id") WITH CHECK ((select auth.uid()) = "post_replies"."profile_id");--> statement-breakpoint
CREATE POLICY "post-reply-delete-policy" ON "post_replies" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "post_replies"."profile_id");--> statement-breakpoint
CREATE POLICY "post-upvote-select-policy" ON "post_upvotes" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "post_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "post-upvote-insert-policy" ON "post_upvotes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "post_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "post-upvote-delete-policy" ON "post_upvotes" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "post_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "post-select-policy" ON "posts" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "post-insert-policy" ON "posts" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "posts"."profile_id");--> statement-breakpoint
CREATE POLICY "post-update-policy" ON "posts" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "posts"."profile_id") WITH CHECK ((select auth.uid()) = "posts"."profile_id");--> statement-breakpoint
CREATE POLICY "post-delete-policy" ON "posts" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "posts"."profile_id");--> statement-breakpoint
CREATE POLICY "topic-select-policy" ON "topics" AS PERMISSIVE FOR SELECT TO public USING (true);