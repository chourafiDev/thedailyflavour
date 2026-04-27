import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import Subscribe from "@/components/subscribe";
import { Separator } from "@/components/ui/separator";
import BlogCard from "@/features/category/components/blog-card";
import Categories from "@/features/category/components/categories";
import {
	generateBreadcrumbSchema,
	generateItemListSchema,
	siteConfig,
} from "@/lib/metadata";
import { getAllAuthors, getAuthorBySlug } from "@/lib/wordpress";

interface AuthorPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps) {
	const { slug } = await params;
	const author = await getAuthorBySlug(slug);
	if (!author) return {};

	return {
		title: `${author.name} — Recipe Creator at ${siteConfig.shortName}`,
		description: author.description || "",
		openGraph: {
			title: `${author.name} — ${siteConfig.shortName}`,
			description: author.description || "",
			images: author.avatar?.url
				? [{ url: author.avatar.url, alt: `${author.name} profile picture` }]
				: [],
		},
	};
}

export async function generateStaticParams() {
	const authors = await getAllAuthors();
	return authors.map((author: { slug: string }) => ({ slug: author.slug }));
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
	const { slug } = await params;

	const author = await getAuthorBySlug(slug);
	if (!author) return notFound();

	const authorPosts = author.posts?.nodes ?? [];

	// Split description into paragraphs (WordPress bio is a single string)
	const bioParagraphs = author.description
		? author.description.split("\n").filter(Boolean)
		: [];

	// ── Schemas ───────────────────────────────────────────────
	const authorSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: author.name,
		url: `${siteConfig.url}/author/${author.slug}`,
		image: author.avatar?.url ?? "",
		description: author.description ?? "",
		worksFor: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
		},
	};

	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: author.name, url: `/author/${author.slug}` },
	]);

	const itemListSchema = generateItemListSchema(
		authorPosts.map(
			(post: { title: string; slug: string; excerpt: string }) => ({
				name: post.title,
				url: `/blog/${post.slug}`,
				description: post.excerpt,
			}),
		),
		`Recipes by ${author.name}`,
	);

	return (
		<>
			<JsonLd data={authorSchema} id="author-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
			<JsonLd data={itemListSchema} id="itemlist-schema" />

			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">{author.name}</span>
					<meta itemProp="position" content="3" />
				</li>
			</Breadcrumbs>

			<main
				id="main-content"
				className="custom-container py-10"
				itemScope
				itemType="https://schema.org/ProfilePage"
			>
				<section
					aria-labelledby="author-info-heading"
					className="section-bottom flex lg:flex-row flex-col items-start lg:gap-6 gap-12"
				>
					<h2 id="author-info-heading" className="sr-only">
						Author Information
					</h2>

					{/* Sidebar */}
					<aside
						className="lg:w-1/6 w-full lg:sticky top-24"
						aria-label="Author profile sidebar"
					>
						{author.avatar?.url && (
							<figure
								itemProp="image"
								itemScope
								itemType="https://schema.org/ImageObject"
								className="relative rounded-full w-[100px] h-[100px] mb-5 mx-auto overflow-hidden"
							>
								<Image
									src={author.avatar.url}
									alt={`${author.name} profile picture`}
									itemProp="url"
									priority
									width={700}
									height={700}
									className="object-cover"
								/>
							</figure>
						)}

						<div
							className="md:mb-10 mb-5 md:pb-10 pb-5 border-b"
							itemScope
							itemType="https://schema.org/Person"
						>
							<h1
								itemProp="name"
								className="text-foreground font-black text-xl text-center mb-1"
							>
								{author.name}
							</h1>
							<meta
								itemProp="url"
								content={`${siteConfig.url}/author/${author.slug}`}
							/>
						</div>

						<Categories />
					</aside>

					{/* Main Content */}
					<div className="lg:w-5/6 w-full lg:border-l lg:pl-6">
						{/* Bio */}
						<header className="mb-10">
							<h2 className="text-3xl text-foreground font-bold mb-4">
								Hi, I&apos;m {author.name}
							</h2>

							{bioParagraphs.length > 0 && (
								<div className="space-y-4">
									{bioParagraphs.map((paragraph: string, i: number) => (
										<p
											key={i}
											className="text-muted-foreground text-base leading-relaxed"
										>
											{paragraph}
										</p>
									))}
								</div>
							)}

							{/* Stats */}
							<div className="flex items-center gap-6 mt-6 text-sm">
								<div>
									<span className="font-bold text-foreground text-3xl">
										{authorPosts.length}
									</span>
									<span className="text-muted-foreground ml-1">Recipes</span>
								</div>
							</div>
						</header>

						{/* Recipes */}
						<section aria-labelledby="author-articles-heading">
							<h3
								id="author-articles-heading"
								className="text-2xl text-foreground font-bold mb-6"
							>
								Recipes by {author.name}
							</h3>

							{authorPosts.length > 0 ? (
								<div className="flex-1 space-y-14 mb-10">
									<div className="space-y-6">
										{authorPosts.map(
											(
												post: {
													slug: string;
													title: string;
													excerpt: string;
													date: string;
													featuredImage?: {
														node?: { sourceUrl?: string };
													};
													categories?: {
														nodes?: { name: string; slug: string }[];
													};
												},
												index: number,
											) => {
												const category = post.categories?.nodes?.[0];
												return (
													<React.Fragment key={post.slug || index}>
														<BlogCard
															category={category?.name || "Recipes"}
															categorySlug={category?.slug || "recipes"}
															image={
																post.featuredImage?.node?.sourceUrl ||
																"/placeholder.jpg"
															}
															date={post.date || new Date().toISOString()}
															author={author.name}
															authorSlug={author.slug}
															title={post.title || "Untitled"}
															slug={post.slug || "#"}
															excerpt={post.excerpt || ""}
														/>
														{index < authorPosts.length - 1 && <Separator />}
													</React.Fragment>
												);
											},
										)}
									</div>
								</div>
							) : (
								<p className="text-muted-foreground">No recipes yet.</p>
							)}
						</section>
					</div>
				</section>

				<Subscribe />
			</main>
		</>
	);
};

export default AuthorPage;
