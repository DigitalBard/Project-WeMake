ALTER TABLE "events" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "message_rooms" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "event-select-policy" ON "events" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "message-room-select-policy" ON "message_rooms" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "message-room-insert-policy" ON "message_rooms" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (true);