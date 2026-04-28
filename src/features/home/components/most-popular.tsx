import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { siteConfig } from "@/lib/metadata";
import { getRecipesByCategory } from "@/lib/wordpress";

type WPPost = {
	title: string;
	slug: string;
	date: string;
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

const MostPopular = async () => {
	const [dinnerPosts, breakfastPosts, dessertPosts, drinkPosts] =
		await Promise.all([
			getRecipesByCategory("dinner"),
			getRecipesByCategory("breakfast"),
			getRecipesByCategory("dessert"),
			getRecipesByCategory("drinks"),
		]);

	return (
		<section aria-labelledby="most-popular-heading" className="section-bottom">
			<h2 id="most-popular-heading" className="title mb-6">
				Most Popular Recipes
			</h2>

			<div className="mb-14 space-y-12">
				<CategorySection
					label="Dinner"
					href="/category/dinner"
					posts={dinnerPosts.slice(0, 8)}
				/>
				<CategorySection
					label="Breakfast"
					href="/category/breakfast"
					posts={breakfastPosts.slice(0, 8)}
				/>
				<CategorySection
					label="Dessert"
					href="/category/dessert"
					posts={dessertPosts.slice(0, 8)}
				/>

				<CategorySection
					label="Drinks"
					href="/category/drinks"
					posts={drinkPosts.slice(0, 8)}
				/>
			</div>
		</section>
	);
};

interface CategorySectionProps {
	label: string;
	href: string;
	posts: WPPost[];
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

		{posts.length === 0 ? (
			<p className="text-muted-foreground text-sm">No recipes found.</p>
		) : (
			<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-2 gap-6">
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
								className="relative w-full h-[300px] rounded-md overflow-hidden"
							>
								{post.featuredImage?.node?.sourceUrl ? (
									<Image
										src={post.featuredImage.node.sourceUrl}
										alt={post.featuredImage.node.altText || post.title}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="absolute object-cover transition-all duration-300 hover:scale-110"
										itemProp="url"
										loading="lazy"
									/>
								) : null}
							</figure>
						</Link>

						<div className="flex items-center gap-2 md:mt-4 mt-2">
							{post.date && (
								<time
									dateTime={post.date}
									itemProp="datePublished"
									className="text-[11px] font-semibold text-foreground"
								>
									{format(new Date(post.date), "MMMM d, yyyy").toUpperCase()}
								</time>
							)}
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
									href={`/author/${post.author?.node?.slug || "#"}`}
									className="text-[11px] text-foreground font-semibold"
								>
									<span className="text-muted-foreground">POST BY</span>{" "}
									<span itemProp="name" className="font-bold">
										{(post.author?.node?.name || "Remi").toUpperCase()}
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
		)}
	</div>
);

export default MostPopular;
