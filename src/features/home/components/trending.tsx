import Image from "next/image";
import Link from "next/link";
import { dummyTrendingPosts } from "@/lib/dummy-data";

const Trending = () => {
	const posts = dummyTrendingPosts;

	if (!posts || posts.length === 0) {
		return null;
	}

	return (
		<section aria-labelledby="trending-heading" className="mb-8">
			<h2 id="trending-heading" className="sr-only">
				The Daily Flavour Trending Recipes
			</h2>

			<div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-2 my-6">
				{posts.map((post, index) => (
					<article
						key={post.slug}
						itemScope
						itemType="https://schema.org/BlogPosting"
						className={`group w-full flex items-center gap-3 
	${index % 2 !== 0 ? "md:border-r md:pr-4" : ""} 
	${index !== posts.length - 1 ? "lg:border-r lg:pr-2" : "lg:pr-0"}
`}
					>
						<Link href={`/blog/${post.slug}`} itemProp="url">
							<figure
								itemProp="image"
								itemScope
								itemType="https://schema.org/ImageObject"
								className="relative w-[90px] h-[70px] rounded-md overflow-hidden"
							>
								<Image
									src={post.mainImage.url}
									alt={post.mainImage.alt}
									fill
									sizes="90px"
									className="absolute object-cover transition-all duration-300 group-hover:scale-110"
									itemProp="url"
									loading={index < 2 ? "eager" : "lazy"}
								/>
							</figure>
						</Link>

						<div>
							<div className="flex items-center gap-0">
								{post.author && (
									<div
										itemProp="author"
										itemScope
										itemType="https://schema.org/Person"
										className="mb-1"
									>
										<Link
											href={`/author/${post.author.slug}`}
											className="text-[9px] font-semibold"
										>
											<span className="text-muted-foreground">POST BY</span>{" "}
											<span itemProp="name">
												{post.author.name?.toUpperCase()}
											</span>
										</Link>
									</div>
								)}
							</div>

							<h3
								itemProp="headline"
								className="text-foreground font-bold text-sm leading-[20px] group-hover:underline line-clamp-2"
							>
								<Link href={`/blog/${post.slug}`}>{post.title}</Link>
							</h3>
						</div>

						{/* Hidden publisher info */}
						<div
							itemProp="publisher"
							itemScope
							itemType="https://schema.org/Organization"
							className="hidden"
						>
							<meta itemProp="name" content="The Daily Flavour" />
						</div>
					</article>
				))}
			</div>
		</section>
	);
};

export default Trending;
