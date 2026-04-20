"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { touristCarryingLuggage } from "@/lib/assets";
import type { TrendingPost } from "@/types/extended-sanity";

interface TrendingProps {
	posts: TrendingPost[];
	loading?: boolean;
}

const Trending = ({ posts, loading }: TrendingProps) => {
	if (loading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
			</div>
		);
	}

	if (!posts || posts.length === 0) {
		return (
			<p className="text-muted-foreground text-sm py-4">
				No trending posts available
			</p>
		);
	}

	return (
		<section
			aria-labelledby="trending-search"
			className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2"
		>
			{posts.map((post, index) => (
				<article
					key={post.slug}
					itemScope
					itemType="https://schema.org/BlogPosting"
					className={`group w-full flex items-center gap-3 
	${index % 2 === 0 ? "md:border-r md:pr-4" : ""} 
	${index !== posts.length - 1 ? "lg:border-r lg:pr-0" : "lg:pr-0"}
`}
				>
					<Link href={`/blog/${post.slug}`} itemProp="url">
						<figure
							itemProp="image"
							itemScope
							itemType="https://schema.org/ImageObject"
							className="relative w-[90px] h-[70px] rounded-lg overflow-hidden"
						>
							<Image
								src={post.mainImage?.asset?.url || touristCarryingLuggage}
								alt={post.mainImage?.alt || post.title || "Trending Post"}
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
							{post.publishedAt && (
								<time
									dateTime={post.publishedAt}
									itemProp="datePublished"
									className="text-[9px] font-bold text-foreground"
								>
									{format(
										new Date(post.publishedAt),
										"MMMM d, yyyy",
									).toUpperCase()}
								</time>
							)}
							<RxDividerVertical
								className="text-foreground font-bold rotate-12"
								aria-hidden="true"
							/>
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
						<meta itemProp="name" content="DROZY" />
					</div>
				</article>
			))}
		</section>
	);
};

export default Trending;
