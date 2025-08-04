import { bigint, integer, pgPolicy, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { profiles } from '../users/schema'
import { sql } from 'drizzle-orm'
import { authenticatedRole, authUid } from 'drizzle-orm/supabase'

export const gptIdeas = pgTable(
  'gpt_ideas',
  {
    gpt_idea_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    idea: text().notNull(),
    views: integer().notNull().default(0),
    claimed_at: timestamp(),
    claimed_by: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp().notNull().defaultNow(),
  },
  table => [
    pgPolicy('gpt-idea-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
    pgPolicy('gpt-idea-update-policy', {
      for: 'update',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${table.claimed_at} IS NULL`,
      withCheck: sql`${authUid} = ${table.claimed_by}`,
    }),
  ]
)

export const gptIdeasLikes = pgTable(
  'gpt_ideas_likes',
  {
    gpt_idea_id: bigint({ mode: 'number' }).references(() => gptIdeas.gpt_idea_id, { onDelete: 'cascade' }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  },
  table => [
    primaryKey({ columns: [table.gpt_idea_id, table.profile_id] }),
    pgPolicy('gpt-idea-like-select-policy', {
      for: 'select',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('gpt-idea-like-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('gpt-idea-like-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
)
