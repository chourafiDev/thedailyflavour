import Image from "next/image";
import Link from "next/link";

type WPPost = {
	title: string;
	slug: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
			altText: string;
		};
	};
	author?: {
		node: {
			name: string;
			slug: string;
		};
	};
};

interface TrendingProps {
	posts: WPPost[];
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
				No trending recipes available
			</p>
		);
	}

	return (
		<section
			aria-labelledby="trending-search"
			className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-2"
		>
			{posts.map((post, index) => (
				<article
					key={post.slug}
					itemScope
					itemType="https://schema.org/BlogPosting"
					className={`group w-full flex items-center gap-3 
						${index % 3 === 0 ? "md:border-r md:pr-4" : ""} 
						${index !== posts.length - 1 ? "lg:border-r lg:pr-4" : "lg:pr-0"}
					`}
				>
					<Link href={`/blog/${post.slug}`} itemProp="url">
						<figure
							itemProp="image"
							itemScope
							itemType="https://schema.org/ImageObject"
							className="relative w-[90px] h-[70px] rounded-lg overflow-hidden"
						>
							{post.featuredImage ? (
								<Image
									src={post.featuredImage?.node?.sourceUrl}
									alt={
										post.featuredImage?.node?.altText ||
										post.title ||
										"Trending Recipe"
									}
									fill
									sizes="90px"
									className="absolute object-cover transition-all duration-300 group-hover:scale-110"
									itemProp="url"
									loading={index < 2 ? "eager" : "lazy"}
								/>
							) : null}
						</figure>
					</Link>

					<div>
						{post.author?.node && (
							<div
								itemProp="author"
								itemScope
								itemType="https://schema.org/Person"
								className="mb-1"
							>
								<Link
									href={`/author/${post.author.node.slug}`}
									className="text-[9px] font-semibold"
								>
									<span className="text-muted-foreground">POST BY</span>{" "}
									<span itemProp="name">
										{post.author.node.name?.toUpperCase()}
									</span>
								</Link>
							</div>
						)}

						<h3
							itemProp="headline"
							className="text-foreground font-bold text-sm leading-[20px] group-hover:underline line-clamp-2"
						>
							<Link href={`/blog/${post.slug}`}>{post.title}</Link>
						</h3>
					</div>

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
		</section>
	);
};

export default Trending;
