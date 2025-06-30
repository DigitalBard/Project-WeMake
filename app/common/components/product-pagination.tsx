import { useSearchParams } from 'react-router'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

type ProductPaginationProps = {
  totalPages: number
}

export function ProductPagination({ totalPages }: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? 1)
  console.log(currentPage)

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <>
              <PaginationItem>
                <PaginationPrevious to={`?page=${currentPage - 1}`} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to={`?page=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink to={`?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage < totalPages && (
            <>
              <PaginationItem>
                <PaginationLink to={`?page=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
              </PaginationItem>
              {currentPage === totalPages - 1 ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext to={`?page=${currentPage + 1}`} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
