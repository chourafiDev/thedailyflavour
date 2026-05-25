import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { siteConfig } from "@/lib/metadata";

const POSTS_PER_PAGE = 12;

interface Post {
	title: string;
	slug: string;
	excerpt: string;
	date: string;
	image: string;
	category: string;
	categorySlug: string;
	author: string;
	authorSlug: string;
}

interface ArticlesPaginatedProps {
	posts: Post[];
	query: string;
	category: string;
	page: number;
}

function buildPageUrl(query: string, category: string, page: number) {
	const params = new URLSearchParams();
	if (query) params.set("q", query);
	if (category) params.set("category", category);
	if (page > 1) params.set("page", String(page));
	const qs = params.toString();
	return `/search${qs ? `?${qs}` : ""}`;
}

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

export function ArticlesPaginated({
	posts,
	query,
	category,
	page,
}: ArticlesPaginatedProps) {
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
	const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
	const paginatedPosts = posts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE,
	);

	if (posts.length === 0) {
		const hasQuery = query || category;
		return (
			<section aria-labelledby="no-results-heading" className="section-bottom">
				<div className="text-center py-20 px-4">
					<div className="max-w-md mx-auto space-y-4">
						<h2
							id="no-results-heading"
							className="text-2xl font-bold text-foreground"
						>
							No Recipes Found
						</h2>
						<p className="text-muted-foreground">
							{query && category
								? `We couldn't find any recipes matching "${query}" in ${category}.`
								: query
									? `No recipes found for "${query}". Try different search terms.`
									: category
										? `No recipes found in ${category}. Check back soon.`
										: "No recipes available at the moment."}
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
							<Button asChild variant="default" size="lg" shadow="sm">
								<Link href="/">Browse All Recipes</Link>
							</Button>
							{hasQuery && (
								<Button asChild variant="outline" size="lg" shadow="sm">
									<Link href="/search">Clear Filters</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="results"
			aria-labelledby="latest-posts-heading"
			className="section-bottom scroll-mt-24"
		>
			<h2
				id="latest-posts-heading"
				className="text-muted-foreground text-lg font-medium font-marcellus mb-4"
			>
				<span className="font-extrabold text-foreground text-2xl">
					{posts.length}
				</span>{" "}
				{posts.length === 1 ? "Result" : "Results"} found
			</h2>

			<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-8">
				{paginatedPosts.map((post) => (
					<article
						key={post.slug}
						itemScope
						itemType="https://schema.org/BlogPosting"
						className="pr-3 border-r border-border"
					>
						<div className="relative w-full">
							<Link href={`/blog/${post.slug}`} itemProp="url">
								<figure
									itemProp="image"
									itemScope
									itemType="https://schema.org/ImageObject"
									className="relative w-full h-[230px] rounded-md overflow-hidden"
								>
									<Image
										src={post.image}
										alt={post.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
										className="absolute object-cover transition-all duration-300 hover:scale-110"
										itemProp="url"
										loading="lazy"
									/>
								</figure>
							</Link>

							<div className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-md border dark:border-white px-4 py-1 rounded-full z-20">
								<Link
									href={`/category/${post.categorySlug}`}
									rel="category tag"
									className="text-[11px] text-white font-semibold uppercase"
								>
									{post.category}
								</Link>
							</div>
						</div>

						<div className="flex items-center gap-0 mt-2">
							<time
								dateTime={post.date}
								itemProp="datePublished"
								className="text-[10px] font-semibold text-foreground"
							>
								{format(new Date(post.date), "MMMM d, yyyy").toUpperCase()}
							</time>
							<RxDividerVertical
								className="text-foreground font-bold rotate-12"
								aria-hidden="true"
							/>
							<div
								itemProp="author"
								itemScope
								itemType="https://schema.org/Person"
								className="mb-1"
							>
								<Link
									href={`/author/${post.authorSlug}`}
									className="text-[10px] text-foreground font-semibold"
								>
									<span className="text-muted-foreground">POST BY</span>{" "}
									<span itemProp="name">{post.author.toUpperCase()}</span>
								</Link>
							</div>
						</div>

						<h3 itemProp="headline" className="post-title leading-6 text-lg">
							<Link href={`/blog/${post.slug}`}>{post.title}</Link>
						</h3>

						<div
							itemProp="publisher"
							itemScope
							itemType="https://schema.org/Organization"
							className="hidden"
						>
							<meta itemProp="name" content={siteConfig.name} />
						</div>
					</article>
				))}
			</div>

			{totalPages > 1 && (
				<div className="mt-16">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href={`${buildPageUrl(query, category, currentPage - 1)}#results`}
									aria-disabled={currentPage === 1}
									className={
										currentPage === 1 ? "pointer-events-none opacity-50" : ""
									}
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
											href={`${buildPageUrl(query, category, p)}#results`}
											isActive={p === currentPage}
										>
											{p}
										</PaginationLink>
									</PaginationItem>
								),
							)}

							<PaginationItem>
								<PaginationNext
									href={`${buildPageUrl(query, category, currentPage + 1)}#results`}
									aria-disabled={currentPage === totalPages}
									className={
										currentPage === totalPages
											? "pointer-events-none opacity-50"
											: ""
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</section>
	);
}
