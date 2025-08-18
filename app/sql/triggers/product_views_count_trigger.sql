create or replace function handle_product_views_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.products
  set stats = jsonb_set(stats, '{views}', ((stats->>'views')::integer + 1)::text::jsonb)
  where NEW.event_type = 'product_view' and NEW.event_data->>'product_id' = product_id::text;
  return new;
end;
$$;

create or replace trigger product_views_count_trigger
after insert on events
for each row
execute function handle_product_views_count();