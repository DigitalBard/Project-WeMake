CREATE OR REPLACE VIEW messages_view AS
SELECT 
    m1.message_room_id,
    profiles.name,
    (SELECT content FROM public.messages WHERE message_room_id = m1.message_room_id ORDER BY message_id DESC) AS last_message,
    m1.profile_id AS profile_id,
    m2.profile_id AS other_profile_id,
    profiles.avatar
FROM public.message_room_members m1
INNER JOIN public.message_room_members m2 ON m1.message_room_id = m2.message_room_id
INNER JOIN profiles ON profiles.profile_id = m2.profile_id