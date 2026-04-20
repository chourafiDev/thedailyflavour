import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronForwardOutline } from "react-icons/io5";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import Subscribe from "@/components/subscribe";
import SubscribeVertical from "@/components/subscribe-vertical";
import ArticleHeader from "@/features/blog/components/article-header";
import AuthorBio from "@/features/blog/components/author-bio";
import PostNavigation from "@/features/blog/components/post-navigation";
import RelatedPosts from "@/features/blog/components/related-posts";
import SocialShareButtons from "@/features/blog/components/social-share-buttons";
import { dummyRecipes } from "@/lib/dummy-data";
import { siteConfig } from "@/lib/metadata";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const post = dummyRecipes.find((r) => r.slug === slug);
	if (!post) return {};

	return {
		title: `${post.title} — ${siteConfig.name}`,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: [{ url: post.mainImage.url, alt: post.mainImage.alt }],
		},
	};
}

export async function generateStaticParams() {
	return dummyRecipes.map((r) => ({ slug: r.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = dummyRecipes.find((r) => r.slug === slug);

	if (!post) return notFound();

	const categoryTitle = post.category?.title || "Recipes";
	const categorySlug = post.category?.slug || "recipes";
	const imageUrl = post.mainImage.url;
	const imageAlt = post.mainImage.alt || post.title;

	// ── Schemas ───────────────────────────────────────────────
	const blogPostSchema = {
		"@context": "https://schema.org",
		"@type": "Recipe",
		name: post.title,
		description: post.excerpt,
		image: imageUrl,
		author: { "@type": "Person", name: post.author.name },
		datePublished: post.publishedAt,
		prepTime: `PT${post.recipeDetails.prepTime}M`,
		cookTime: `PT${post.recipeDetails.cookTime}M`,
		totalTime: `PT${post.recipeDetails.prepTime + post.recipeDetails.cookTime}M`,
		recipeYield: `${post.recipeDetails.servings} servings`,
		recipeCuisine: post.recipeDetails.cuisine,
		publisher: { "@type": "Organization", name: siteConfig.name },
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
			{
				"@type": "ListItem",
				position: 2,
				name: categoryTitle,
				item: `${siteConfig.url}/category/${categorySlug}`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: `${siteConfig.url}/blog/${post.slug}`,
			},
		],
	};

	// ── Dummy TOC headings ────────────────────────────────────
	const headings = [
		{ id: "ingredients", text: "Ingredients", level: 2 },
		{ id: "instructions", text: "Instructions", level: 2 },
		{ id: "tips", text: "Tips & Notes", level: 2 },
	];

	return (
		<>
			{/* JSON-LD Schemas */}
			<JsonLd data={blogPostSchema} id="blog-post-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />

			{/* Breadcrumbs */}
			<Breadcrumbs>
				<>
					<li
						itemProp="itemListElement"
						itemScope
						itemType="https://schema.org/ListItem"
					>
						<Link
							href={`/category/${categorySlug}`}
							className="font-bold"
							itemProp="item"
						>
							<span itemProp="name">{categoryTitle}</span>
						</Link>
						<meta itemProp="position" content="2" />
					</li>
					<li>
						<IoChevronForwardOutline className="size-3.5" aria-hidden="true" />
					</li>
					<li
						itemProp="itemListElement"
						itemScope
						itemType="https://schema.org/ListItem"
						className="text-foreground"
					>
						<span itemProp="name">{post.title}</span>
						<meta itemProp="position" content="3" />
					</li>
				</>
			</Breadcrumbs>

			<main className="custom-container">
				<article
					itemScope
					itemType="https://schema.org/BlogPosting"
					className="mb-16 mt-10"
				>
					{/* Article Header — pass dummy post shaped to match what ArticleHeader expects */}
					<ArticleHeader post={post} />

					{/* Featured Image */}
					<figure
						itemProp="image"
						itemScope
						itemType="https://schema.org/ImageObject"
						className="my-8"
					>
						<Image
							src={imageUrl}
							alt={imageAlt}
							width={1200}
							height={700}
							itemProp="url"
							priority
							className="object-cover rounded-xl w-full h-[700px]"
						/>
						<meta itemProp="width" content="1200" />
						<meta itemProp="height" content="700" />
					</figure>

					<div className="flex items-start gap-5 lg:w-[90%] lg:mx-auto">
						{/* Sidebar */}
						<aside className="lg:w-[25%] lg:block hidden sticky top-24 space-y-5">
							{/* <TableOfContent headings={headings} title="In this recipe" /> */}
							<SocialShareButtons post={post} />
							<SubscribeVertical />
						</aside>

						{/* Article body */}
						<div className="lg:w-[75%] w-full">
							{/* Recipe quick stats */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-soft-linen rounded-xl p-5 mb-8">
								<div className="text-center">
									<p className="text-[11px] text-muted-foreground uppercase font-semibold mb-1">
										Prep Time
									</p>
									<p className="font-bold text-foreground">
										{post.recipeDetails.prepTime} min
									</p>
								</div>
								<div className="text-center">
									<p className="text-[11px] text-muted-foreground uppercase font-semibold mb-1">
										Cook Time
									</p>
									<p className="font-bold text-foreground">
										{post.recipeDetails.cookTime} min
									</p>
								</div>
								<div className="text-center">
									<p className="text-[11px] text-muted-foreground uppercase font-semibold mb-1">
										Servings
									</p>
									<p className="font-bold text-foreground">
										{post.recipeDetails.servings}
									</p>
								</div>
								<div className="text-center">
									<p className="text-[11px] text-muted-foreground uppercase font-semibold mb-1">
										Difficulty
									</p>
									<p className="font-bold text-foreground">
										{post.recipeDetails.difficulty}
									</p>
								</div>
							</div>

							{/* Dummy body content — replace with WPGraphQL post.content once live */}
							<div id="ingredients" className="mb-8">
								<h2 className="text-foreground font-extrabold text-2xl mb-4">
									Ingredients
								</h2>
								<ul className="space-y-2 text-foreground">
									<li className="flex items-start gap-2">
										<span className="text-primary mt-1">•</span>Ingredient
										details will appear here from WordPress
									</li>
									<li className="flex items-start gap-2">
										<span className="text-primary mt-1">•</span>Add your
										ingredients in the WordPress ACF fields
									</li>
									<li className="flex items-start gap-2">
										<span className="text-primary mt-1">•</span>Each ingredient
										goes on a new line
									</li>
								</ul>
							</div>

							<div id="instructions" className="mb-8">
								<h2 className="text-foreground font-extrabold text-2xl mb-4">
									Instructions
								</h2>
								<ol className="space-y-4 text-foreground">
									<li className="flex items-start gap-3">
										<span className="font-extrabold text-primary min-w-[24px]">
											1.
										</span>
										Step-by-step instructions will appear here from WordPress
									</li>
									<li className="flex items-start gap-3">
										<span className="font-extrabold text-primary min-w-[24px]">
											2.
										</span>
										Add your instructions in the WordPress ACF fields
									</li>
									<li className="flex items-start gap-3">
										<span className="font-extrabold text-primary min-w-[24px]">
											3.
										</span>
										Each step goes on a new line
									</li>
								</ol>
							</div>

							<div id="tips" className="mb-8">
								<h2 className="text-foreground font-extrabold text-2xl mb-4">
									Tips &amp; Notes
								</h2>
								<div className="bg-soft-linen rounded-xl p-5">
									<p className="text-foreground text-sm leading-7">
										{post.excerpt}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Article Footer Metadata */}
					<footer className="hidden">
						<meta itemProp="datePublished" content={post.publishedAt} />
						<div
							itemProp="publisher"
							itemScope
							itemType="https://schema.org/Organization"
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
						{post.author?.name && (
							<div
								itemProp="author"
								itemScope
								itemType="https://schema.org/Person"
							>
								<meta itemProp="name" content={post.author.name} />
							</div>
						)}
					</footer>
				</article>

				{/* AUTHOR BIO */}
				{post.author && <AuthorBio author={post.author} />}

				{/* POST NAVIGATION */}
				{post.slug && <PostNavigation currentSlug={post.slug} />}

				{/* RELATED POSTS */}
				{post.slug && post.category?.slug && (
					<RelatedPosts
						currentSlug={post.slug}
						categorySlug={post.category.slug}
					/>
				)}

				{/* NEWSLETTER SUBSCRIBE */}
				<Subscribe />
			</main>
		</>
	);
}
