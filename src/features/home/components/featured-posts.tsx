import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { siteConfig } from "@/lib/metadata";
import type { Recipe } from "@/lib/types";
import { getFeaturedRecipes } from "@/lib/wordpress";

const FeaturedPosts = async () => {
	const posts = await getFeaturedRecipes(5);

	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<section
			aria-labelledby="featured-posts-heading"
			className="section-bottom"
		>
			<div className="flex items-center justify-between">
				<h2 id="featured-posts-heading" className="title">
					Recipes You Will Love
				</h2>
				<Link
					href="/search"
					className="text-foreground flex items-center gap-1 text-sm font-medium cursor-pointer hover:underline"
				>
					Explore All Recipes{" "}
					<ChevronRight className="size-4" aria-hidden="true" />
				</Link>
			</div>

			<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 lg:gap-3 gap-6 mt-4">
				{posts.map((post: Recipe, index: number) => {
					const image = post.featuredImage?.node;
					const category = post.categories?.nodes?.[0];
					const author = post.author?.node;

					return (
						<article
							key={post.slug || index}
							itemScope
							itemType="https://schema.org/BlogPosting"
						>
							<div className="relative w-full">
								<Link href={`/blog/${post.slug}`} itemProp="url">
									<figure
										itemProp="image"
										itemScope
										itemType="https://schema.org/ImageObject"
										className="relative w-full h-[220px] rounded-md overflow-hidden"
									>
										{image?.sourceUrl && (
											<Image
												src={image.sourceUrl}
												alt={image.altText || post.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
												className="absolute object-cover transition-all duration-300 hover:scale-110"
												itemProp="url"
												loading="lazy"
											/>
										)}
									</figure>
								</Link>

								{category && (
									<div className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-md border dark:border-white px-4 py-1 rounded-full z-20">
										<Link
											href={`/category/${category.slug}`}
											rel="category tag"
											className="text-[11px] text-white font-semibold uppercase"
										>
											{category.name}
										</Link>
									</div>
								)}
							</div>

							<div className="flex items-center gap-0 md:mt-4 mt-2">
								{post.date && (
									<time
										dateTime={post.date}
										itemProp="datePublished"
										className="text-[10px] font-semibold text-foreground"
									>
										{format(new Date(post.date), "MMMM d, yyyy").toUpperCase()}
									</time>
								)}
								<RxDividerVertical
									className="text-foreground font-bold rotate-12"
									aria-hidden="true"
								/>
								{author && (
									<div
										itemProp="author"
										itemScope
										itemType="https://schema.org/Person"
										className="mb-1"
									>
										<Link
											href={`/author/${author.slug}`}
											className="text-[10px] text-foreground font-semibold"
										>
											<span className="text-muted-foreground">POST BY</span>{" "}
											<span itemProp="name">{author.name?.toUpperCase()}</span>
										</Link>
									</div>
								)}
							</div>

							<h3 itemProp="headline" className="post-title leading-6 text-lg">
								<Link href={`/blog/${post.slug}`}>{post.title}</Link>
							</h3>

							{/* Hidden publisher */}
							<div
								itemProp="publisher"
								itemScope
								itemType="https://schema.org/Organization"
								className="hidden"
							>
								<meta itemProp="name" content={siteConfig.name} />
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default FeaturedPosts;
