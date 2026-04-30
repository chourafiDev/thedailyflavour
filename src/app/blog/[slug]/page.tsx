import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { IoChevronForwardOutline } from "react-icons/io5";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd, type RecipeSchema } from "@/components/JsonLd";
import RecipeCard from "@/components/recipe-card";
import Subscribe from "@/components/subscribe";
import SubscribeVertical from "@/components/subscribe-vertical";
import TableOfContent from "@/components/table-of-content";
import { buttonVariants } from "@/components/ui/button";
import ArticleHeader from "@/features/blog/components/article-header";
import AuthorBio from "@/features/blog/components/author-bio";
import MobileSidebar from "@/features/blog/components/mobile-sidebar";
import PostNavigation from "@/features/blog/components/post-navigation";
import RelatedPosts from "@/features/blog/components/related-posts";
import SocialShareButtons from "@/features/blog/components/social-share-buttons";
import { siteConfig } from "@/lib/metadata";
import { cn, extractHeadings } from "@/lib/utils";
import { getAllRecipes, getRecipeBySlug } from "@/lib/wordpress";

interface PageProps {
	params: Promise<{ slug: string }>;
}

function cleanText(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/&#8217;/g, "'")
		.replace(/&#8220;/g, '"')
		.replace(/&#8221;/g, '"')
		.replace(/&#8211;/g, "–")
		.replace(/&#8212;/g, "—")
		.replace(/&amp;/g, "&")
		.replace(/&hellip;/g, "…")
		.replace(/\[&hellip;\]/g, "…")
		.trim();
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const post = await getRecipeBySlug(slug);
	if (!post) return {};

	const seo = post.seo;
	const imageUrl =
		seo?.openGraph?.image?.url || post.featuredImage?.node?.sourceUrl;
	const excerpt = post.excerpt ? cleanText(post.excerpt) : "";

	return {
		title: seo?.title || `${post.title} — ${siteConfig.name}`,
		description: seo?.description || excerpt,
		keywords: seo?.focusKeywords ?? undefined,
		alternates: {
			canonical: seo?.canonicalUrl || `${siteConfig.url}/blog/${slug}`,
		},
		openGraph: {
			title: seo?.openGraph?.title || post.title,
			description: seo?.openGraph?.description || excerpt,
			...(imageUrl && { images: [{ url: imageUrl, alt: post.title }] }),
		},
	};
}

export async function generateStaticParams() {
	const posts = await getAllRecipes();
	return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
	const { slug } = await params;
	const post = await getRecipeBySlug(slug);
	if (!post) return notFound();

	const categoryTitle = post.categories?.nodes?.[0]?.name || "Recipes";
	const categorySlug = post.categories?.nodes?.[0]?.slug || "recipes";
	const imageUrl = post.featuredImage?.node?.sourceUrl || "";
	const imageAlt = post.featuredImage?.node?.altText || post.title;
	const r = post.recipeDetails;
	const seo = post.seo;

	const { headings, content: enrichedContent } = extractHeadings(
		post.content ?? "",
	);

	const excerpt = post.excerpt ? cleanText(post.excerpt) : "";

	const authorName = post.author?.node?.name?.includes("@")
		? "Sarah Mitchell"
		: post.author?.node?.name || "Sarah Mitchell";

	const authorSlug = post.author?.node?.slug?.includes("gmail")
		? "Sarah Mitchell"
		: post.author?.node?.slug || "Sarah Mitchell";

	const authorObj = {
		name: authorName,
		slug: authorSlug,
		image: post.author?.node?.avatar?.url || "",
	};

	// ── Schema.org arrays (plain text, no group headers) ────────────────────────
	const ingredientsForSchema =
		r?.ingredients
			?.split("\n")
			.map((l: string) => l.trim())
			.filter((l: string) => l && !l.startsWith("##")) ?? [];

	const instructionsForSchema =
		r?.instructions
			?.split("\n")
			.map((l: string) => l.trim())
			.filter((l: string) => l && !l.startsWith("##")) ?? [];

	// ── JSON-LD ──────────────────────────────────────────────────────────────────
	const recipeSchema: RecipeSchema = {
		"@context": "https://schema.org",
		"@type": "Recipe",
		name: seo?.title || post.title,
		description: seo?.description || excerpt || undefined,
		image: imageUrl || undefined,
		author: { "@type": "Person", name: authorName },
		datePublished: post.date,
		prepTime: r?.prepTime ? `PT${r.prepTime}M` : undefined,
		cookTime: r?.cookTime ? `PT${r.cookTime}M` : undefined,
		totalTime: r?.totalTime
			? `PT${r.totalTime}M`
			: r?.prepTime && r?.cookTime
				? `PT${r.prepTime + r.cookTime}M`
				: undefined,
		nutrition: r?.calories
			? { "@type": "NutritionInformation", calories: `${r.calories} calories` }
			: undefined,
		recipeIngredient: ingredientsForSchema.length
			? ingredientsForSchema
			: undefined,
		recipeInstructions: instructionsForSchema.length
			? instructionsForSchema.map((text: string, i: number) => ({
					"@type": "HowToStep",
					position: i + 1,
					text,
				}))
			: undefined,
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

	return (
		<>
			<JsonLd data={recipeSchema} id="recipe-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />

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
					className="mb-16 mt-6"
				>
					<ArticleHeader post={{ ...post, author: authorObj }} />

					<div className="flex items-start gap-5 lg:w-[90%] lg:mx-auto">
						{/* Sidebar */}
						<aside className="lg:w-[25%] lg:block hidden sticky top-24 space-y-5">
							<div className="space-y-3">
								<Link
									href="https://www.pinterest.com/the_daily_flavour/"
									target="_blank"
									className={cn(
										buttonVariants({
											variant: "default",
											size: "lg",
											shadow: "sm",
										}),

										"bg-[#E60023] w-full dark:text-white dark:border-[#E60023]",
									)}
								>
									Follow us on Pinterest <FaArrowRight />
								</Link>
								<TableOfContent headings={headings} />
							</div>
							<SocialShareButtons post={{ ...post, author: authorObj }} />
							<SubscribeVertical />
						</aside>

						{/* Article body */}
						<div className="lg:w-[75%] w-full">
							{imageUrl && (
								<figure
									itemProp="image"
									itemScope
									itemType="https://schema.org/ImageObject"
									className="mb-6"
								>
									<Image
										src={imageUrl}
										alt={imageAlt}
										width={1200}
										height={700}
										itemProp="url"
										priority
										className="object-cover rounded-md aspect-square"
									/>
									<meta itemProp="width" content="1200" />
									<meta itemProp="height" content="700" />
								</figure>
							)}

							{/* WordPress content */}
							{enrichedContent && (
								<div
									className="post-content mb-10 max-w-none"
									dangerouslySetInnerHTML={{ __html: enrichedContent }}
								/>
							)}

							{r && (
								<RecipeCard
									title={post.title}
									description={excerpt || undefined}
									featuredImageUrl={imageUrl || undefined}
									featuredImageAlt={imageAlt || undefined}
									prepTime={r.prepTime ?? undefined}
									servings={r.servings ?? undefined}
									cookTime={r.cookTime ?? undefined}
									totalTime={r.totalTime ?? undefined}
									calories={r.calories ?? undefined}
									cost={r.cost ?? undefined}
									ingredientsRaw={r.ingredients ?? undefined}
									instructionsRaw={r.instructions ?? undefined}
									notes={r.notes ?? undefined}
									nutrition={r.nutrition ?? undefined}
									author={authorName}
								/>
							)}
						</div>
					</div>

					<footer className="hidden">
						<meta itemProp="datePublished" content={post.date} />
						<div
							itemProp="publisher"
							itemScope
							itemType="https://schema.org/Organization"
						>
							<meta itemProp="name" content={siteConfig.name} />
						</div>
						<div
							itemProp="author"
							itemScope
							itemType="https://schema.org/Person"
						>
							<meta itemProp="name" content={authorName} />
						</div>
					</footer>
				</article>

				<AuthorBio author={authorObj} />
				{post.slug && <PostNavigation currentSlug={post.slug} />}
				{post.slug && categorySlug && (
					<RelatedPosts currentSlug={post.slug} categorySlug={categorySlug} />
				)}
				<Subscribe />
				<MobileSidebar
					slug={post.slug}
					title={post.title}
					imageUrl={imageUrl}
					headings={headings}
				/>
			</main>
		</>
	);
}
