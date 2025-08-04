import { sql } from 'drizzle-orm'
import { jsonb, pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { authenticatedRole, authUid } from 'drizzle-orm/supabase'

export const eventTypes = pgEnum('event_types', ['product_view', 'product_visit', 'profile_view'])

export const events = pgTable(
  'events',
  {
    event_id: uuid('event_id').primaryKey().defaultRandom(),
    event_type: eventTypes('event_type'),
    event_data: jsonb('event_data'),
    created_at: timestamp('created_at').defaultNow(),
  },
  table => [
    pgPolicy('event-select-policy', {
      for: 'select',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`true`,
    }),
    pgPolicy('event-insert-policy', {
      for: 'insert',
      to: 'public',
      as: 'permissive',
      withCheck: sql`${table.event_data}->>0 IN (SELECT CAST(product_id AS TEXT) FROM products) OR ${table.event_data}->>0 IN (SELECT username FROM profiles)`,
    }),
  ]
)
