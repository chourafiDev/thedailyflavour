import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { type DummyRecipe, dummyPostsByCategory } from "@/lib/dummy-data";
import { siteConfig } from "@/lib/metadata";

const placeholderImg =
	"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80";

const MostPopular = () => {
	const dinnerPosts = dummyPostsByCategory("dinner", 3);
	const breakfastPosts = dummyPostsByCategory("breakfast", 3);
	const dessertPosts = dummyPostsByCategory("dessert", 3);

	return (
		<section aria-labelledby="most-popular-heading" className="section-bottom">
			<h2 id="most-popular-heading" className="title mb-6">
				Most Popular Recipes
			</h2>

			<div className="mb-14 space-y-12">
				<CategorySection
					label="Dinner"
					href="/category/dinner"
					posts={dinnerPosts}
				/>
				<CategorySection
					label="Breakfast"
					href="/category/breakfast"
					posts={breakfastPosts}
				/>
				<CategorySection
					label="Dessert"
					href="/category/dessert"
					posts={dessertPosts}
				/>
			</div>
		</section>
	);
};

interface CategorySectionProps {
	label: string;
	href: string;
	posts: DummyRecipe[];
}

const CategorySection = ({ label, href, posts }: CategorySectionProps) => (
	<div className="w-full">
		<div className="flex items-center justify-between mb-4">
			<h3 className="text-foreground font-black uppercase text-lg italic">
				{label}
			</h3>
			<Link
				href={href}
				className="text-sm text-foreground font-semibold underline flex items-center gap-1"
				aria-label={`View more ${label} recipes`}
			>
				View More <ArrowRight className="size-3 mt-1" aria-hidden="true" />
			</Link>
		</div>

		<div className="bg-foreground h-0.5 rounded-full w-full mb-6" />

		<div className="grid grid-cols-4 gap-2">
			{posts.map((post, index) => (
				<article
					key={post.slug || index}
					itemScope
					itemType="https://schema.org/BlogPosting"
				>
					<Link
						href={`/blog/${post.slug}`}
						itemProp="url"
						className="w-full h-full"
					>
						<figure
							itemProp="image"
							itemScope
							itemType="https://schema.org/ImageObject"
							className="relative w-full h-[300px] rounded-xl overflow-hidden"
						>
							<Image
								src={post.mainImage?.url || placeholderImg}
								alt={post.mainImage?.alt || post.title}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="absolute object-cover transition-all duration-300 hover:scale-110"
								itemProp="url"
								loading="lazy"
							/>
						</figure>
					</Link>

					<div className="flex items-center gap-2 mt-4">
						<time
							dateTime={post.publishedAt || ""}
							itemProp="datePublished"
							className="text-[11px] font-semibold text-foreground"
						>
							{post.publishedAt
								? format(
										new Date(post.publishedAt),
										"MMMM d, yyyy",
									).toUpperCase()
								: ""}
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
								href={`/author/${post.author?.slug || "#"}`}
								className="text-[11px] text-foreground font-semibold"
							>
								<span className="text-muted-foreground">POST BY</span>{" "}
								<span itemProp="name" className="font-bold">
									{(post.author?.name || "Remi").toUpperCase()}
								</span>
							</Link>
						</div>
					</div>

					<h4 itemProp="headline" className="post-title">
						<Link href={`/blog/${post.slug}`}>{post.title}</Link>
					</h4>

					<div
						itemProp="publisher"
						itemScope
						itemType="https://schema.org/Organization"
						className="hidden"
					>
						<meta itemProp="name" content={siteConfig.name} />
						<div
							itemProp="logo"
							itemScope
							itemType="https://schema.org/ImageObject"
						>
							<meta itemProp="url" content={`${siteConfig.url}/logo.png`} />
						</div>
					</div>
				</article>
			))}
		</div>
	</div>
);

export default MostPopular;
