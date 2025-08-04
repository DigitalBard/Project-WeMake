ALTER TABLE "gpt_ideas" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_upvotes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "teams" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "gpt-idea-select-policy" ON "gpt_ideas" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "gpt-idea-update-policy" ON "gpt_ideas" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("gpt_ideas"."claimed_at" IS NULL) WITH CHECK ((select auth.uid()) = "gpt_ideas"."claimed_by");--> statement-breakpoint
CREATE POLICY "gpt-idea-like-select-policy" ON "gpt_ideas_likes" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "gpt_ideas_likes"."profile_id");--> statement-breakpoint
CREATE POLICY "gpt-idea-like-insert-policy" ON "gpt_ideas_likes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "gpt_ideas_likes"."profile_id");--> statement-breakpoint
CREATE POLICY "gpt-idea-like-delete-policy" ON "gpt_ideas_likes" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "gpt_ideas_likes"."profile_id");--> statement-breakpoint
CREATE POLICY "category-select-policy" ON "categories" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "product-upvote-select-policy" ON "product_upvotes" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "product_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "product-upvote-insert-policy" ON "product_upvotes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "product_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "product-upvote-delete-policy" ON "product_upvotes" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "product_upvotes"."profile_id");--> statement-breakpoint
CREATE POLICY "product-select-policy" ON "products" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "product-insert-policy" ON "products" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "products"."profile_id");--> statement-breakpoint
CREATE POLICY "product-update-policy" ON "products" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "products"."profile_id") WITH CHECK ((select auth.uid()) = "products"."profile_id");--> statement-breakpoint
CREATE POLICY "product-delete-policy" ON "products" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "products"."profile_id");--> statement-breakpoint
CREATE POLICY "review-select-policy" ON "reviews" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "review-insert-policy" ON "reviews" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "reviews"."profile_id");--> statement-breakpoint
CREATE POLICY "review-delete-policy" ON "reviews" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "reviews"."profile_id");--> statement-breakpoint
CREATE POLICY "team-select-policy" ON "teams" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "team-insert-policy" ON "teams" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "teams"."team_leader_id");--> statement-breakpoint
CREATE POLICY "team-update-policy" ON "teams" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.uid()) = "teams"."team_leader_id") WITH CHECK ((select auth.uid()) = "teams"."team_leader_id");--> statement-breakpoint
CREATE POLICY "team-delete-policy" ON "teams" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.uid()) = "teams"."team_leader_id");