import { bigint, check, integer, pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { PRODUCT_STAGES } from './constants'
import { sql } from 'drizzle-orm'
import { profiles } from '../users/schema'
import { authenticatedRole, authUid } from 'drizzle-orm/supabase'

export const productStages = pgEnum('product_stages', PRODUCT_STAGES.map(stage => stage.value) as [string, ...string[]])

export const teams = pgTable(
  'teams',
  {
    team_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    product_name: text().notNull(),
    team_size: integer().notNull(),
    equity_split: integer().notNull(),
    product_stage: productStages().notNull(),
    roles: text().notNull(),
    product_description: text().notNull(),
    team_leader_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  table => [
    check('team_size_check', sql`${table.team_size} BETWEEN 1 AND 100`),
    check('equity_split_check', sql`${table.equity_split} BETWEEN 1 AND 100`),
    check('product_description_check', sql`LENGTH(${table.product_description}) <= 200`),
    pgPolicy('team-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
    pgPolicy('team-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.team_leader_id}`,
    }),
    pgPolicy('team-update-policy', {
      for: 'update',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.team_leader_id}`,
      withCheck: sql`${authUid} = ${table.team_leader_id}`,
    }),
    pgPolicy('team-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.team_leader_id}`,
    }),
  ]
)
