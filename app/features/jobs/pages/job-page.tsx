import { Badge } from '~/common/components/ui/badge'
import type { Route } from './+types/job-page'
import { DotIcon } from 'lucide-react'
import { Button } from '~/common/components/ui/button'

export const meta: Route.MetaFunction = () => {
  return [{ title: 'Job Details | wemake' }, { name: 'description', content: 'View job details' }]
}

export default function JobPage() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 gap-20 -mt-20 items-start">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
              <img src="https://github.com/facebook.png" alt="company logo" className="object-cover" />
            </div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Full-time</Badge>
            <Badge variant="secondary">Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              We are looking for a Software Engineer with 3+ years of experience in React, Node.js, and TypeScript. The
              ideal candidate will have a strong understanding of modern web development practices and a passion for
              building scalable and efficient applications.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                'Develop and maintain web applications using React, Node.js, and TypeScript.',
                'Implement new features and improve existing code.',
                'Optimize application performance and scalability.',
                'Collaborate with other developers and stakeholders to deliver high-quality software.',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or a related field.",
                '3+ years of experience in software development.',
                'Strong understanding of modern web development practices.',
                'Experience with React, Node.js, and TypeScript.',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                'Health insurance',
                'Dental insurance',
                'Vision insurance',
                '401(k) retirement plan',
                'Paid time off',
                'Flexible work hours',
              ].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {['React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Git', 'Docker', 'Kubernetes'].map(
                item => (
                  <li key={item}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="col-span-2 mt-32 sticky top-20 border rounded-lg space-y-5 p-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full-time</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Posted 2 days ago</span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  )
}
