import { type MetaFunction, Link } from 'react-router'
import { ProductCard } from '../../features/products/components/product-card'
import { PostCard } from '../../features/community/components/post-card'
import { IdeaCard } from '../../features/ideas/components/idea-card'
import { JobCard } from '../../features/jobs/components/job-card'
import { TeamCard } from '../../features/teams/components/team-card'
import { Button } from '../components/ui/button'
export const meta: MetaFunction = () => {
  return [{ title: 'Home | wemake' }, { name: 'description', content: 'Home page' }]
}

export default function HomePage() {
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
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentCount={12}
            viewCount={12}
            upvoteCount={120}
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
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={index}
            id={`postId-${index}`}
            title={`Discussion Title ${index}`}
            author={`Author ${index}`}
            avatarUrl={`https://github.com/apple.png`}
            category={`Category ${index}`}
            createdAt={`12 hours ago`}
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
        {Array.from({ length: 11 }).map((_, index) => (
          <IdeaCard
            key={index}
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, deliveering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business."
            viewCount={123}
            createdAt="12 hours ago"
            upvoteCount={12}
            isClaimed={index % 2 === 0}
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
        {Array.from({ length: 11 }).map((_, index) => (
          <JobCard
            key={index}
            id="jobId"
            companyName="Tesla"
            companyLogoUrl="https://github.com/facebook.png"
            companyHq="San Francisco, CA"
            title="Software Engineer"
            createdAt="12 hours ago"
            locationType="Full-time"
            positionLocation="Remote"
            salary="$100,000 - $120,000"
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
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={index}
            id="teamId"
            username="lynn"
            avatarUrl="https://github.com/inthetiger.png"
            positions={['React Developer', 'Backend Developer', 'Product Developer']}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  )
}
