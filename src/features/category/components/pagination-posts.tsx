import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationPostsProps = {
	currentPage: number;
	totalPages: number;
	basePath?: string;
};

function getPageNumbers(
	currentPage: number,
	totalPages: number,
): (number | "ellipsis")[] {
	if (totalPages <= 5)
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	const pages: (number | "ellipsis")[] = [1];
	if (currentPage > 3) pages.push("ellipsis");
	const start = Math.max(2, currentPage - 1);
	const end = Math.min(totalPages - 1, currentPage + 1);
	for (let i = start; i <= end; i++) pages.push(i);
	if (currentPage < totalPages - 2) pages.push("ellipsis");
	pages.push(totalPages);
	return pages;
}

function getPageUrl(basePath: string, page: number) {
	const base = page === 1 ? basePath : `${basePath}?page=${page}`;
	return `${base}#results`;
}

export default function PaginationPosts({
	currentPage,
	totalPages,
	basePath = "",
}: PaginationPostsProps) {
	const isPrevDisabled = currentPage === 1;
	const isNextDisabled = currentPage === totalPages;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={getPageUrl(basePath, currentPage - 1)}
						aria-disabled={isPrevDisabled}
						className={isPrevDisabled ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>

				{getPageNumbers(currentPage, totalPages).map((p, i) =>
					p === "ellipsis" ? (
						<PaginationItem key={`ellipsis-${i}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={p}>
							<PaginationLink
								href={getPageUrl(basePath, p)}
								isActive={p === currentPage}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					<PaginationNext
						href={getPageUrl(basePath, currentPage + 1)}
						aria-disabled={isNextDisabled}
						className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
