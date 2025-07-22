import type { Database } from '~/supa-client'
import type { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from './constants'
import type { SupabaseClient } from '@supabase/supabase-js'

export const getJobs = async (
  client: SupabaseClient<Database>,
  {
    limit,
    type,
    location,
    salary,
  }: {
    limit: number
    type?: (typeof JOB_TYPES)[number]['value']
    location?: (typeof LOCATION_TYPES)[number]['value']
    salary?: (typeof SALARY_RANGE)[number]
  }
) => {
  const baseQuery = client
    .from('jobs')
    .select(
      `
    job_id,
    position,
    company_name,
    company_logo,
    company_location,
    job_type,
    location,
    salary_range,
    created_at

    `
    )
    .limit(limit)

  if (type) {
    baseQuery.eq('job_type', type)
  }

  if (location) {
    baseQuery.eq('location', location)
  }

  if (salary) {
    baseQuery.eq('salary_range', salary)
  }

  const { data, error } = await baseQuery

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getJobById = async (client: SupabaseClient<Database>, { jobId }: { jobId: number }) => {
  const { data, error } = await client.from('jobs').select('*').eq('job_id', jobId).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
