-- Follow user
CREATE FUNCTION public.notify_follow()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.notifications (type, source_id, target_id)
  VALUES ('follow', NEW.follower_id, NEW.following_id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_follow_trigger
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE PROCEDURE public.notify_follow();

-- Review product
DROP FUNCTION IF EXISTS public.notify_review();

CREATE FUNCTION public.notify_review()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
DECLARE
  product_owner uuid;
BEGIN
  SELECT profile_id INTO product_owner FROM public.products WHERE product_id = NEW.product_id;
  INSERT INTO public.notifications (type, source_id, target_id, product_id)
  VALUES ('review', NEW.profile_id, product_owner, NEW.product_id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE PROCEDURE public.notify_review();

-- Reply to post
DROP FUNCTION IF EXISTS public.notify_reply();

CREATE FUNCTION public.notify_reply()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
DECLARE
  post_owner uuid;
BEGIN
  SELECT profile_id INTO post_owner FROM public.posts WHERE post_id = NEW.post_id;
  INSERT INTO public.notifications (type, source_id, target_id, post_id)
  VALUES ('reply', NEW.profile_id, post_owner, NEW.post_id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_reply_trigger
AFTER INSERT ON public.post_replies
FOR EACH ROW
EXECUTE PROCEDURE public.notify_reply();