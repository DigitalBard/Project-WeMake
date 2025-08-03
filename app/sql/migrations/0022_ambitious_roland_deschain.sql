ALTER TABLE "todos" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "todo-insert-policy" ON "todos" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "todos"."profile_id");--> statement-breakpoint
CREATE POLICY "todo-select-policy" ON "todos" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "todos"."profile_id");