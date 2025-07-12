import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const eventTypes = pgEnum('event_types', ['product_view', 'product_visit', 'profile_view'])

export const events = pgTable('events', {
  event_id: uuid('event_id').primaryKey().defaultRandom(),
  event_type: eventTypes('event_type'),
  event_data: jsonb('event_data'),
  created_at: timestamp('created_at').defaultNow(),
})
