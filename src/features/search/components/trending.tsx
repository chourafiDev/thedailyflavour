import Image from "next/image";
import Link from "next/link";
import type { DummyRecipe } from "@/lib/dummy-data";

const PLACEHOLDER =
	"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80";

interface TrendingProps {
	posts: DummyRecipe[];
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
							<Image
								src={post.mainImage?.url || PLACEHOLDER}
								alt={post.mainImage?.alt || post.title || "Trending Recipe"}
								fill
								sizes="90px"
								className="absolute object-cover transition-all duration-300 group-hover:scale-110"
								itemProp="url"
								loading={index < 2 ? "eager" : "lazy"}
							/>
						</figure>
					</Link>

					<div>
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
									<span itemProp="name">{post.author.name?.toUpperCase()}</span>
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
		</section>
	);
};

export default Trending;
