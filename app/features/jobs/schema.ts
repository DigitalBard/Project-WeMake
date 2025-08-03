import { bigint, pgEnum, pgPolicy, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from './constants'
import { sql } from 'drizzle-orm'
import { authenticatedRole } from 'drizzle-orm/supabase'
import { authUid } from 'drizzle-orm/supabase'
import { profiles } from '../users/schema'

export const jobTypes = pgEnum('job_type', JOB_TYPES.map(type => type.value) as [string, ...string[]])

export const locations = pgEnum('location', LOCATION_TYPES.map(type => type.value) as [string, ...string[]])

export const salaryRanges = pgEnum('salary_range', SALARY_RANGE)

export const jobs = pgTable(
  'jobs',
  {
    job_id: bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    position: text().notNull(),
    overview: text().notNull(),
    responsibilities: text().notNull(),
    qualifications: text().notNull(),
    benefits: text().notNull(),
    skills: text().notNull(),
    company_name: text().notNull(),
    company_logo: text().notNull(),
    company_location: text().notNull(),
    apply_url: text().notNull(),
    job_type: jobTypes().notNull(),
    location: locations().notNull(),
    salary_range: salaryRanges().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    registered_by: uuid()
      .references(() => profiles.profile_id, { onDelete: 'cascade' })
      .notNull(),
  },
  table => [
    // 일반 사용자는 INSERT 가능 (자신이 등록한 채용공고만)
    pgPolicy('job-insert-policy', {
      for: 'insert',
      to: authenticatedRole,
      as: 'permissive',
      withCheck: sql`${authUid} = ${table.registered_by}`,
    }),
    // 모든 사용자는 SELECT 가능 (채용공고 조회)
    pgPolicy('job-select-policy', {
      for: 'select',
      to: 'public',
      as: 'permissive',
      using: sql`true`,
    }),
    // 자신이 등록한 채용공고만 UPDATE 가능
    pgPolicy('job-update-policy', {
      for: 'update',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.registered_by}`,
      withCheck: sql`${authUid} = ${table.registered_by}`,
    }),
    // 자신이 등록한 채용공고만 DELETE 가능
    pgPolicy('job-delete-policy', {
      for: 'delete',
      to: authenticatedRole,
      as: 'permissive',
      using: sql`${authUid} = ${table.registered_by}`,
    }),
  ]
)
