import { Button } from '~/common/components/ui/button'
import { JobCard } from '../components/job-card'
import type { Route } from './+types/jobs-page'
import PageHeader from '~/common/components/page-header'
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants'
import { data, useSearchParams } from 'react-router'
import { cn } from '~/lib/utils'
import { getJobs } from '../queries'
import { z } from 'zod'
import { makeSSRClient } from '~/supa-client'

export const meta: Route.MetaFunction = ({ data: { searchParams } }: Route.MetaArgs) => {
  return [
    {
      title: `${searchParams.location || ''} ${searchParams.type || ''} ${searchParams.salary || ''} jobs | wemake`,
    },
    { name: 'description', content: 'Find your dream job at wemake' },
  ]
}

const searchParamsSchema = z.object({
  type: z.enum(JOB_TYPES.map(type => type.value) as [string, ...string[]]).optional(),
  location: z.enum(LOCATION_TYPES.map(location => location.value) as [string, ...string[]]).optional(),
  salary: z.enum(SALARY_RANGE).optional(),
})

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  const url = new URL(request.url)
  const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams))

  if (!success) {
    throw data(
      {
        error_code: 'invalid_search_params',
        error_message: 'Invalid search params',
      },
      { status: 400 }
    )
  }

  const jobs = await getJobs(client, {
    limit: 10,
    type: parsedData.type as (typeof JOB_TYPES)[number]['value'],
    location: parsedData.location as (typeof LOCATION_TYPES)[number]['value'],
    salary: parsedData.salary,
  })

  return { jobs, searchParams: parsedData }
}
export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const { jobs } = loaderData

  const [searchParams, setSearchParams] = useSearchParams()
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value)
    setSearchParams(searchParams)
  }

  return (
    <div className="">
      <PageHeader title="Jobs" description="Companies looking for makers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {jobs.map(job => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              companyName={job.company_name}
              companyLogoUrl={job.company_logo}
              companyHq={job.company_location}
              title={job.position}
              createdAt={job.created_at}
              type={job.job_type}
              positionLocation={job.location}
              salary={job.salary_range}
            />
          ))}
        </div>
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => onFilterClick('type', type.value)}
                  className={cn(type.value === searchParams.get('type') ? 'bg-accent' : '')}>
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => onFilterClick('location', location.value)}
                  className={cn(location.value === searchParams.get('location') ? 'bg-accent' : '')}>
                  {location.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Salary Range</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((range, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  onClick={() => onFilterClick('salary', range)}
                  className={cn(range === searchParams.get('salary') ? 'bg-accent' : '')}>
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
