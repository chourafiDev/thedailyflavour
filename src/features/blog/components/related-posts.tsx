import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getRelatedRecipes } from "@/lib/wordpress";

interface RelatedPostsProps {
	currentSlug: string;
	categorySlug: string;
}

type WPRelatedPost = {
	title: string;
	slug: string;
	date: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
			altText: string;
		};
	};
	categories?: {
		nodes: { name: string; slug: string }[];
	};
	author?: {
		node: {
			name: string;
			slug: string;
		};
	};
};

const RelatedPosts = async ({
	currentSlug,
	categorySlug,
}: RelatedPostsProps) => {
	const displayPosts: WPRelatedPost[] = await getRelatedRecipes(
		categorySlug,
		currentSlug,
		4,
	);

	if (!displayPosts || displayPosts.length === 0) return null;

	return (
		<section aria-labelledby="related-posts-heading" className="mb-16">
			<h2
				id="related-posts-heading"
				className="text-foreground font-bold text-[22px] mb-4"
			>
				Related Posts
			</h2>

			<Carousel opts={{ align: "start" }} className="w-full">
				<CarouselContent>
					{displayPosts.map((post) => (
						<CarouselItem key={post.slug} className="md:basis-1/2 lg:basis-1/4">
							<RelatedPostCard post={post} />
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="flex items-center justify-center gap-2 mt-5">
					<CarouselPrevious />
					<CarouselNext />
				</div>
			</Carousel>
		</section>
	);
};

// ── Card ──────────────────────────────────────────────────────
interface RelatedPostCardProps {
	post: WPRelatedPost;
}

const RelatedPostCard = ({ post }: RelatedPostCardProps) => {
	const postTitle = post.title || "Untitled Post";
	const postSlug = post.slug || "#";
	const postImage = post.featuredImage?.node?.sourceUrl;
	const postImageAlt = post.featuredImage?.node?.altText || postTitle;
	const postDate = post.date;
	const categoryTitle = post.categories?.nodes?.[0]?.name || "Recipes";
	const authorName = post.author?.node?.name || "Remi";
	const authorSlug = post.author?.node?.slug || "#";

	return (
		<article itemScope itemType="https://schema.org/BlogPosting">
			<Link href={`/blog/${postSlug}`} itemProp="url">
				<div className="relative w-full h-[220px] rounded-md overflow-hidden">
					{postImage ? (
						<Image
							src={postImage}
							alt={postImageAlt}
							fill
							className="absolute object-cover transition-all duration-300 hover:scale-110"
							itemProp="image"
							loading="lazy"
						/>
					) : (
						<div className="absolute inset-0 bg-muted flex items-center justify-center">
							<span className="text-muted-foreground text-sm">No image</span>
						</div>
					)}

					<div className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-md border dark:border-white px-4 py-1.5 rounded-full z-20">
						<p className="text-[11px] text-white font-semibold uppercase">
							{categoryTitle}
						</p>
					</div>
				</div>
			</Link>

			<div className="flex items-center gap-0 mt-4 mb-1">
				{postDate && (
					<time
						dateTime={postDate}
						itemProp="datePublished"
						className="text-[10px] font-semibold text-foreground"
					>
						{format(new Date(postDate), "MMMM d, yyyy")}
					</time>
				)}
				<RxDividerVertical
					className="text-foreground font-bold rotate-12"
					aria-hidden="true"
				/>
				<div itemProp="author" itemScope itemType="https://schema.org/Person">
					<Link
						href={`/author/${authorSlug}`}
						className="text-[10px] text-foreground font-semibold"
					>
						<span className="text-muted-foreground">POST BY</span>{" "}
						<span itemProp="name">{authorName.toUpperCase()}</span>
					</Link>
				</div>
			</div>

			<h3 itemProp="headline" className="post-title leading-6 text-lg">
				<Link href={`/blog/${postSlug}`}>{postTitle}</Link>
			</h3>
		</article>
	);
};

export default RelatedPosts;
