import { type AnyPgColumn, bigint, pgPolicy, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { profiles } from '../users/schema'
import { sql } from 'drizzle-orm'
import { authenticatedRole, authUid } from 'drizzle-orm/supabase'

export const topics = pgTable(
  'topics',
  {
    topic_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    slug: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  () => [
    pgPolicy('topic-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
  ]
)

export const posts = pgTable(
  'posts',
  {
    post_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    content: text().notNull(),
    upvotes: bigint({ mode: 'number' }).default(0),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    profile_id: uuid()
      .references(() => profiles.profile_id, { onDelete: 'cascade' })
      .notNull(),
    topic_id: bigint({ mode: 'number' })
      .references(() => topics.topic_id, { onDelete: 'cascade' })
      .notNull(),
  },
  table => [
    pgPolicy('post-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
    pgPolicy('post-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-update-policy', {
      for: 'update',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
)

export const postUpvotes = pgTable(
  'post_upvotes',
  {
    post_id: bigint({ mode: 'number' }).references(() => posts.post_id, { onDelete: 'cascade' }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' }),
  },
  table => [
    primaryKey({ columns: [table.post_id, table.profile_id] }),
    pgPolicy('post-upvote-select-policy', {
      for: 'select',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-upvote-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-upvote-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
)

export const postReplies = pgTable(
  'post_replies',
  {
    post_reply_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    post_id: bigint({ mode: 'number' }).references(() => posts.post_id, { onDelete: 'cascade' }),
    parent_id: bigint({ mode: 'number' }).references((): AnyPgColumn => postReplies.post_reply_id, {
      onDelete: 'cascade',
    }),
    profile_id: uuid()
      .references(() => profiles.profile_id, { onDelete: 'cascade' })
      .notNull(),
    reply: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  table => [
    pgPolicy('post-reply-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
    pgPolicy('post-reply-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-reply-update-policy', {
      for: 'update',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy('post-reply-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
)
