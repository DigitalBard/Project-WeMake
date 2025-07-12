import { type MetaFunction, Link } from 'react-router'
import { ProductCard } from '../../features/products/components/product-card'
import { PostCard } from '../../features/community/components/post-card'
import { IdeaCard } from '../../features/ideas/components/idea-card'
import { JobCard } from '../../features/jobs/components/job-card'
import { TeamCard } from '../../features/teams/components/team-card'
import { Button } from '../components/ui/button'
import { getProductsByDateRange } from '~/features/products/queries'
import { DateTime } from 'luxon'
import type { Route } from './+types/home-page'
import { getPosts } from '~/features/community/queries'
import { getGptIdeas } from '~/features/ideas/queries'
import { getJobs } from '~/features/jobs/queries'
import { getTeams } from '~/features/teams/queries'

export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Home page' }]
}

export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf('day'),
    endDate: DateTime.now().endOf('day'),
    limit: 7,
  })

  const posts = await getPosts({
    limit: 10,
    sorting: 'newest',
  })

  const ideas = await getGptIdeas({
    limit: 10,
  })

  const jobs = await getJobs({
    limit: 11,
  })

  const teams = await getTeams({
    limit: 7,
  })

  return { products, posts, ideas, jobs, teams }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products, posts, ideas, jobs, teams } = loaderData

  return (
    <div className="space-y-40">
      {/* Products */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-lg font-light text-foreground">The best products made by our community today.</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
        </div>
        {products.map(product => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewCount={product.views}
            upvoteCount={product.upvotes}
          />
        ))}
      </div>
      {/* Discussions */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Disscusions</h2>
          <p className="text-xl font-light text-foreground">The latest discussions from our community.</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {posts.map(post => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            avatarUrl={post.author_avatar}
            category={post.topic}
            createdAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>
      {/* Ideas */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-xl font-light text-foreground">Find the best idea for your next project.</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {ideas.map(idea => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={idea.views}
            createdAt={idea.created_at}
            upvoteCount={idea.likes}
            isClaimed={idea.is_claimed}
          />
        ))}
      </div>
      {/* Jobs */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-xl font-light text-foreground">Find your dream job.</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
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
      {/* Teams */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">Find a team mate</h2>
          <p className="text-xl font-light text-foreground">Join a team looking for a new member.</p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {teams.map(team => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            username={team.team_leader.username}
            avatarUrl={team.team_leader.avatar}
            positions={team.roles.split(', ')}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  )
}
