ALTER POLICY "message-select-policy" ON "messages" TO authenticated USING (EXISTS (
        SELECT 1 FROM message_room_members mrm 
        WHERE mrm.message_room_id = "messages"."message_room_id" 
        AND mrm.profile_id = (select auth.uid())
      ));--> statement-breakpoint
ALTER POLICY "message-insert-policy" ON "messages" TO authenticated WITH CHECK ("messages"."sender_id" = (select auth.uid()) AND EXISTS (
        SELECT 1 FROM message_room_members mrm 
        WHERE mrm.message_room_id = "messages"."message_room_id" 
        AND mrm.profile_id = (select auth.uid())
      ));