import { Link } from 'react-router'
import { Button } from '../../../common/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../common/components/ui/card'
import { Badge } from '../../../common/components/ui/badge'

interface JobCardProps {
  id: string
  companyName: string
  companyLogoUrl: string
  companyHq: string
  title: string
  createdAt: string
  locationType: string
  positionLocation: string
  salary: string
}

export function JobCard({
  id,
  companyName,
  companyLogoUrl,
  companyHq,
  title,
  createdAt,
  locationType,
  positionLocation,
  salary,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img src={companyLogoUrl} alt={`${companyName} Logo`} className="size-10 rounded-full" />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-xs text-muted-foreground">{createdAt}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{locationType}</Badge>
          <Badge variant="outline">{positionLocation}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{salary}</span>
            <span className="text-sm font-medium text-muted-foreground">{companyHq}</span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
