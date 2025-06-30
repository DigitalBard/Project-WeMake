import PageHeader from '~/common/components/page-header'
import type { Route } from './+types/submit-job-page'
import { Form } from 'react-router'
import InputPair from '~/common/components/input-pair'
import SelectPair from '~/common/components/select-pair'
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from '../constants'
import { Button } from '~/common/components/ui/button'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Post a Job | wemake' }, { name: 'description', content: 'Submit a new job posting' }]
}

export default function SubmitJobPage() {
  return (
    <div>
      <PageHeader title="Post a Job" description="Reach out to the best developers in the world." />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-20">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            id="position"
            label="Position"
            description="(40 chararcters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Senior React Developer"
          />
          <InputPair
            id="overview"
            label="Overview"
            description="(400 chararcters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e We are looking for a senior React developer to join our team..."
          />
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 chararcters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e Implement new features, Maintain code quality, etc."
          />
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 chararcters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e Bachelor's degree in Computer Science, 3+ years of experience, etc."
          />
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 chararcters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e Health insurance, Dental insurance, Vision insurance, etc."
          />
          <InputPair
            id="skills"
            label="Skills"
            description="(400 chararcters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            textArea
            placeholder="i.e React, Node.js, TypeScript, etc."
          />
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 chararcters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e wemake"
          />
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 chararcters max)"
            name="companyLogoUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://wemake.com/logo.png"
          />
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 chararcters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Remote, San Francisco, etc."
          />
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 chararcters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e https://wemake.com/apply"
          />
          <SelectPair
            label="Job Type"
            name="jobType"
            description="Select the type of job"
            placeholder="Select the type of job"
            required
            options={JOB_TYPES.map(type => ({ label: type.label, value: type.value }))}
          />
          <SelectPair
            label="Job Location"
            name="jobLocation"
            description="Select the location of the job"
            placeholder="Select the location of the job"
            required
            options={LOCATION_TYPES.map(type => ({ label: type.label, value: type.value }))}
          />
          <SelectPair
            label="Salary Range"
            name="salaryRange"
            description="Select the salary range of the job"
            placeholder="Select the salary range of the job"
            required
            options={SALARY_RANGE.map(salary => ({ label: salary, value: salary }))}
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size={'lg'}>
          Post job for $100
        </Button>
      </Form>
    </div>
  )
}
