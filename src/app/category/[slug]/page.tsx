import { notFound } from "next/navigation";
import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import SubscribeVertical from "@/components/subscribe-vertical";
import { Separator } from "@/components/ui/separator";
import BlogCard from "@/features/category/components/blog-card";
import Categories from "@/features/category/components/categories";
import CategoryHeader from "@/features/category/components/category-header";
import PaginationPosts from "@/features/category/components/pagination-posts";
import Search from "@/features/category/components/search";
import {
	generateBreadcrumbSchema,
	generateCollectionPageSchema,
	generateItemListSchema,
	siteConfig,
} from "@/lib/metadata";
import { getAllCategories, getCategoryWithPosts } from "@/lib/wordpress";

export interface BlogCardProps {
	image: string;
	date: string;
	author: string;
	authorSlug: string;
	title: string;
	slug: string;
	category: string;
	categorySlug: string;
	excerpt: string;
}

interface PageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 10;

function cleanExcerpt(html: string): string {
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

function cleanAuthorName(name?: string | null): string {
	if (!name) return "Sarah Mitchell";
	if (name.includes("@")) return "Sarah Mitchell";
	return name;
}

function cleanAuthorSlug(slug?: string | null): string {
	if (!slug) return "sarah-mitchell";
	if (slug.includes("gmail")) return "sarah-mitchell";
	return slug;
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const category = await getCategoryWithPosts(slug);
	const title = category?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
	return {
		title: `${title} Recipes — ${siteConfig.name}`,
		description: `Browse all ${title.toLowerCase()} recipes on ${siteConfig.name}`,
	};
}

export async function generateStaticParams() {
	try {
		const categories = await getAllCategories();
		return categories.map((cat: { slug: string }) => ({ slug: cat.slug }));
	} catch {
		return [];
	}
}

const PostsByCategoryPage = async ({ params, searchParams }: PageProps) => {
	const { slug } = await params;
	const { page: pageParam } = await searchParams;

	const category = await getCategoryWithPosts(slug);
	if (!category) return notFound();

	const categoryTitle =
		category.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
	const allCategoryPosts = category.posts?.nodes ?? [];

	// Pagination
	const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
	const totalPosts = allCategoryPosts.length;
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	if (totalPosts > 0 && (currentPage < 1 || currentPage > totalPages)) {
		return notFound();
	}

	const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
	const paginated = allCategoryPosts.slice(
		startIndex,
		startIndex + POSTS_PER_PAGE,
	);

	// Transform to BlogCardProps
	const posts: BlogCardProps[] = paginated.map(
		(post: {
			title: string;
			slug: string;
			date: string;
			excerpt: string;
			featuredImage?: { node?: { sourceUrl?: string } };
			author?: { node?: { name?: string; slug?: string } };
		}) => ({
			image: post.featuredImage?.node?.sourceUrl || "",
			date: post.date || new Date().toISOString(),
			author: cleanAuthorName(post.author?.node?.name),
			authorSlug: cleanAuthorSlug(post.author?.node?.slug),
			title: post.title || "Untitled Recipe",
			slug: post.slug || "",
			category: categoryTitle,
			categorySlug: slug,
			excerpt: post.excerpt ? cleanExcerpt(post.excerpt) : "",
		}),
	);

	// Empty state
	if (totalPosts === 0) {
		return (
			<>
				<Breadcrumbs>
					<li
						itemProp="itemListElement"
						itemScope
						itemType="https://schema.org/ListItem"
						className="text-foreground"
					>
						<span itemProp="name">{categoryTitle}</span>
						<meta itemProp="position" content="2" />
					</li>
				</Breadcrumbs>
				<main className="custom-container my-10">
					<CategoryHeader slug={slug} postCount={0} />
					<div className="py-44 bg-soft-linen rounded-md flex justify-center items-center">
						<h1 className="text-foreground font-semibold text-lg">
							No recipes found in this category yet
						</h1>
					</div>
				</main>
			</>
		);
	}

	// Schemas
	const collectionSchema = generateCollectionPageSchema(
		categoryTitle,
		`Browse all ${categoryTitle.toLowerCase()} recipes`,
	);
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: categoryTitle, url: `/category/${slug}` },
	]);
	const itemListSchema = generateItemListSchema(
		posts.map((p) => ({
			name: p.title,
			url: `/blog/${p.slug}`,
			description: p.excerpt,
		})),
		`${categoryTitle} Recipes`,
	);

	return (
		<>
			<JsonLd data={collectionSchema} id="collection-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
			<JsonLd data={itemListSchema} id="itemlist-schema" />

			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">{categoryTitle}</span>
					<meta itemProp="position" content="2" />
				</li>
			</Breadcrumbs>

			<main className="custom-container mt-10">
				<CategoryHeader slug={slug} postCount={totalPosts} />

				<section
					aria-labelledby="posts-heading"
					className="mb-10 flex lg:flex-row flex-col gap-5 items-start"
				>
					<h2 id="posts-heading" className="sr-only">
						{categoryTitle} Recipes
					</h2>

					{/* Posts list */}
					<div className="flex-1 space-y-14 mb-10 lg:border-r border-border lg:pr-5">
						<div className="space-y-6">
							{posts.map((post, index) => (
								<React.Fragment key={`${post.slug}-${index}`}>
									<BlogCard
										image={post.image}
										date={post.date}
										author={post.author}
										authorSlug={post.authorSlug}
										title={post.title}
										slug={post.slug}
										category={post.category}
										categorySlug={post.categorySlug}
										excerpt={post.excerpt}
									/>
									{index < posts.length - 1 && <Separator />}
								</React.Fragment>
							))}
						</div>

						{totalPages > 1 && (
							<PaginationPosts
								currentPage={currentPage}
								totalPages={totalPages}
								basePath={`/category/${slug}`}
							/>
						)}
					</div>

					{/* Sidebar */}
					<aside aria-label="Sidebar" className="lg:w-auto w-full">
						<div className="space-y-8 w-full">
							<Search />
							<Categories />
							<Separator aria-hidden="true" />
							<SubscribeVertical />
						</div>
					</aside>
				</section>
			</main>
		</>
	);
};

export default PostsByCategoryPage;
