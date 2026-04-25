import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/metadata";
import { searchRecipes } from "@/lib/wordpress";

const PLACEHOLDER =
	"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80";

function stripHtml(html: string) {
	return html.replace(/<[^>]*>/g, "").trim();
}

interface ArticlesProps {
	query: string;
	category: string;
}

const Articles = async ({ query, category }: ArticlesProps) => {
	const results = await searchRecipes(
		query || undefined,
		category || undefined,
	);

	const posts = results.map(
		(r: {
			title: string;
			slug: string;
			excerpt: string;
			date: string;
			featuredImage?: { node?: { sourceUrl?: string } };
			categories?: { nodes?: { name: string; slug: string }[] };
			author?: { node?: { name?: string; slug?: string } };
		}) => ({
			title: r.title || "Untitled",
			slug: r.slug || "",
			excerpt: r.excerpt ? stripHtml(r.excerpt) : "",
			date: r.date || new Date().toISOString(),
			image: r.featuredImage?.node?.sourceUrl || PLACEHOLDER,
			category: r.categories?.nodes?.[0]?.name || "Recipes",
			categorySlug: r.categories?.nodes?.[0]?.slug || "recipes",
			author: r.author?.node?.name || "Sarah Mitchell",
			authorSlug: r.author?.node?.slug || "sarah-mitchell",
		}),
	);

	const resultsCount = posts.length;
	const hasQuery = query || category;

	if (resultsCount === 0) {
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
								? `We couldn't find any recipes matching "${query}" in ${category}. Try different keywords or browse other categories.`
								: query
									? `No recipes found for "${query}". Try different search terms or explore our categories.`
									: category
										? `No recipes found in ${category}. Check back soon for new content.`
										: "No recipes available at the moment."}
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
							<Button asChild variant="default" size="lg" shadow={"sm"}>
								<Link href="/">Browse All Recipes</Link>
							</Button>
							{hasQuery && (
								<Button asChild variant="outline" size="lg" shadow={"sm"}>
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
		<section aria-labelledby="latest-posts-heading" className="section-bottom">
			<h2
				id="latest-posts-heading"
				className="text-muted-foreground text-lg font-medium font-marcellus mb-4"
			>
				<span className="font-extrabold text-foreground text-2xl">
					{resultsCount}
				</span>{" "}
				{resultsCount === 1 ? "Result" : "Results"} found
			</h2>

			<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-8">
				{posts.map((post) => (
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
		</section>
	);
};

export default Articles;
