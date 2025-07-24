import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-job-page'
import { Form, redirect, useNavigation } from 'react-router'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants'
import { Button } from '~/common/components/ui/button'
import { getLoggedInUserId } from '~/features/users/queries'
import { makeSSRClient } from '~/supa-client'
import z from 'zod'
import { createJob } from '../mutations'
import { Loader2 } from 'lucide-react'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post a Job | wemake' }, { name: 'description', content: 'Submit a new job posting' }]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request)
  await getLoggedInUserId(client)
}

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  companyName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map(type => type.value) as [string, ...string[]]),
  jobLocation: z.enum(LOCATION_TYPES.map(type => type.value) as [string, ...string[]]),
  salaryRange: z.enum(SALARY_RANGE),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request)
  const userId = await getLoggedInUserId(client)
  const formData = await request.formData()
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors }
  }

  const { job_id } = await createJob(client, data)
  return redirect(`/jobs/${job_id}`)
}

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting' || navigation.state === 'loading'

  return (
    <div>
      <PageHeader title="Post a Job" description="Reach out to the best developers in the world." />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-20" method="post">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 chararcters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            defaultValue="Senior React Developer"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.position?.join(', ')}</p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 chararcters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            textArea
            defaultValue="We are looking for a senior React developer to join our team..."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.overview?.join(', ')}</p>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 chararcters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            textArea
            defaultValue="Implement new features, Maintain code quality, etc."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.responsibilities?.join(', ')}</p>
          )}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 chararcters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            textArea
            defaultValue="Bachelor's degree in Computer Science, 3+ years of experience, etc."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.qualifications?.join(', ')}</p>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 chararcters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            textArea
            defaultValue="Health insurance, Dental insurance, Vision insurance, etc."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.benefits?.join(', ')}</p>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 chararcters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            textArea
            defaultValue="React, Node.js, TypeScript, etc."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.skills?.join(', ')}</p>
          )}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 chararcters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            defaultValue="wemake"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.companyName?.join(', ')}</p>
          )}
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 chararcters max)"
            name="companyLogoUrl"
            maxLength={40}
            type="url"
            required
            defaultValue="https://wemake.com/logo.png"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.companyLogoUrl?.join(', ')}</p>
          )}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 chararcters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            defaultValue="Remote, San Francisco, etc."
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.companyLocation?.join(', ')}</p>
          )}
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 chararcters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            defaultValue="https://wemake.com/apply"
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.applyUrl?.join(', ')}</p>
          )}
          <SelectPair
            label="Job Type"
            name="jobType"
            description="Select the type of job"
            placeholder="Select the type of job"
            required
            options={JOB_TYPES.map(type => ({ label: type.label, value: type.value }))}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.jobType?.join(', ')}</p>
          )}
          <SelectPair
            label="Job Location"
            name="jobLocation"
            description="Select the location of the job"
            placeholder="Select the location of the job"
            required
            options={LOCATION_TYPES.map(type => ({ label: type.label, value: type.value }))}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.jobLocation?.join(', ')}</p>
          )}
          <SelectPair
            label="Salary Range"
            name="salaryRange"
            description="Select the salary range of the job"
            placeholder="Select the salary range of the job"
            required
            options={SALARY_RANGE.map(salary => ({ label: salary, value: salary }))}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className="text-red-500">{actionData.fieldErrors?.salaryRange?.join(', ')}</p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size={'lg'} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-4 h-4 mr-2" /> : 'Post job for $100'}
        </Button>
      </Form>
    </div>
  )
}
