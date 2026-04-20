import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	paginationItemsToDisplay?: number;
	basePath?: string;
};

export default function PaginationPosts({
	currentPage,
	totalPages,
	paginationItemsToDisplay = 5,
	basePath = "",
}: PaginationProps) {
	const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
		currentPage,
		totalPages,
		paginationItemsToDisplay,
	});

	const getPageUrl = (page: number) => {
		if (page === 1) {
			return basePath || "/";
		}
		return `${basePath}?page=${page}`;
	};

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous page button */}
				<PaginationItem>
					<PaginationPrevious
						className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
						href={currentPage === 1 ? undefined : getPageUrl(currentPage - 1)}
						aria-disabled={currentPage === 1 ? true : undefined}
						role={currentPage === 1 ? "link" : undefined}
					/>
				</PaginationItem>

				{/* Left ellipsis (...) */}
				{showLeftEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Page number links */}
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href={getPageUrl(page)}
							isActive={page === currentPage}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Right ellipsis (...) */}
				{showRightEllipsis && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next page button */}
				<PaginationItem>
					<PaginationNext
						className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
						href={
							currentPage === totalPages
								? undefined
								: getPageUrl(currentPage + 1)
						}
						aria-disabled={currentPage === totalPages ? true : undefined}
						role={currentPage === totalPages ? "link" : undefined}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
