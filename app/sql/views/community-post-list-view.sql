CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
    p.post_id,
    p.title,
    p.created_at,
    t.name AS topic,
    pr.name AS author,
    pr.username AS author_username,
    pr.avatar AS author_avatar,
    p.upvotes,
    t.slug AS topic_slug,
    (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = p.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted
FROM posts p
INNER JOIN topics t USING (topic_id)
INNER JOIN profiles pr USING (profile_id)