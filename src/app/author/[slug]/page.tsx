import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import Subscribe from "@/components/subscribe";
import { Separator } from "@/components/ui/separator";
import BlogCard from "@/features/category/components/blog-card";
import Categories from "@/features/category/components/categories";
import { dummyRecipes } from "@/lib/dummy-data";
import {
	generateBreadcrumbSchema,
	generateItemListSchema,
	siteConfig,
} from "@/lib/metadata";

// ── Remi's persona ────────────────────────────────────────────
const REMI = {
	name: "Remi Cassidy",
	slug: "remi-cassidy",
	jobTitle: "Home Cook & Recipe Creator",
	location: "London, UK",
	image:
		"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
	tagline: "World flavours, weeknight speed",
	bio: [
		"Hi, I'm Remi Cassidy 👋 the home cook behind The Daily Flavour. I'm obsessed with finding the quickest path to genuinely delicious food, and I've spent years figuring out how to get the flavours of the world onto a busy family table in 30 minutes or less.",
		"It started with a notebook. Every time I tasted something incredible a bowl of ramen in Tokyo, shakshuka at a tiny café in Tel Aviv, tacos from a street cart in Mexico City I'd scribble it down and spend the next few weeks working out how to recreate it on a Tuesday night with a supermarket shop and no sous chef.",
		"The Daily Flavour is where those recipes live. No obscure ingredients. No three-hour braises. Just quick, honest cooking that makes weeknights feel a little more like an adventure.",
		"When I'm not in the kitchen I'm probably planning the next trip, eating something I definitely shouldn't be photographing, or convincing my family to try yet another cuisine they've never heard of.",
	],
	social: {
		instagram: siteConfig.social.instagram.url,
		pinterest: siteConfig.social.pinterest.url,
	},
};

interface AuthorPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps) {
	const { slug } = await params;
	if (slug !== REMI.slug) return {};

	return {
		title: `${REMI.name} — Recipe Creator at ${siteConfig.shortName}`,
		description: REMI.bio[0],
		openGraph: {
			title: `${REMI.name} — ${siteConfig.shortName}`,
			description: REMI.bio[0],
			images: [{ url: REMI.image, alt: `${REMI.name} profile picture` }],
		},
	};
}

export async function generateStaticParams() {
	return [{ slug: REMI.slug }];
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
	const { slug } = await params;

	// Only Remi exists for now — 404 any other slug
	if (slug !== REMI.slug) return notFound();

	const authorPosts = dummyRecipes.filter((r) => r.author.slug === slug);

	// ── Schemas ───────────────────────────────────────────────
	const authorSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: REMI.name,
		url: `${siteConfig.url}/author/${REMI.slug}`,
		image: REMI.image,
		jobTitle: REMI.jobTitle,
		description: REMI.bio[0],
		worksFor: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
		},
		sameAs: [REMI.social.instagram, REMI.social.pinterest],
	};

	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: REMI.name, url: `/author/${REMI.slug}` },
	]);

	const itemListSchema = generateItemListSchema(
		authorPosts.map((post) => ({
			name: post.title,
			url: `/blog/${post.slug}`,
			description: post.excerpt,
		})),
		`Recipes by ${REMI.name}`,
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
					<span itemProp="name">{REMI.name}</span>
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
						className="lg:w-1/6 w-full sticky top-20"
						aria-label="Author profile sidebar"
					>
						<figure
							itemProp="image"
							itemScope
							itemType="https://schema.org/ImageObject"
							className="relative rounded-full size-[120px] mb-5 mx-auto overflow-hidden"
						>
							<Image
								src={REMI.image}
								alt={`${REMI.name} profile picture`}
								itemProp="url"
								priority
								fill
								sizes="120px"
								className="absolute object-cover"
							/>
						</figure>

						<div
							className="md:mb-10 mb-5 md:pb-10 pb-5 border-b"
							itemScope
							itemType="https://schema.org/Person"
						>
							<h1
								itemProp="name"
								className="text-foreground font-black text-xl text-center mb-1"
							>
								{REMI.name}
							</h1>
							<p className="text-foreground text-center text-sm">
								{REMI.tagline}
							</p>
							<meta
								itemProp="url"
								content={`${siteConfig.url}/author/${REMI.slug}`}
							/>
						</div>

						<Categories />
					</aside>

					{/* Main Content */}
					<div className="lg:w-5/6 w-full lg:border-l lg:pl-6">
						{/* Bio */}
						<header className="mb-10">
							<h2 className="text-3xl text-foreground font-bold mb-4">
								Hi, I&apos;m {REMI.name}
							</h2>

							<div className="space-y-4">
								{REMI.bio.map((paragraph, i) => (
									<p
										key={i}
										className="text-muted-foreground text-base leading-relaxed"
									>
										{paragraph}
									</p>
								))}
							</div>

							{/* Stats */}
							<div className="flex items-center gap-6 mt-6 text-sm">
								<div>
									<span className="font-bold text-foreground text-3xl">
										{authorPosts.length}
									</span>
									<span className="text-muted-foreground ml-1">Recipes</span>
								</div>
								<div>
									<span className="font-bold text-foreground text-3xl">
										{
											[
												...new Set(
													authorPosts.map((p) => p.recipeDetails.cuisine),
												),
											].length
										}
									</span>
									<span className="text-muted-foreground ml-1">Cuisines</span>
								</div>
							</div>
						</header>

						{/* Recipes */}
						<section aria-labelledby="author-articles-heading">
							<h3
								id="author-articles-heading"
								className="text-2xl text-foreground font-bold mb-6"
							>
								Recipes by {REMI.name}
							</h3>

							{authorPosts.length > 0 ? (
								<div className="flex-1 space-y-14 mb-10">
									<div className="space-y-6">
										{authorPosts.map((post, index) => (
											<React.Fragment key={post.slug || index}>
												<BlogCard
													category={post.category?.title || "Recipes"}
													categorySlug={post.category?.slug || "dinner"}
													image={post.mainImage?.url || "/placeholder.jpg"}
													date={post.publishedAt || new Date().toISOString()}
													author={REMI.name}
													authorSlug={REMI.slug}
													title={post.title || "Untitled"}
													slug={post.slug || "#"}
													excerpt={post.excerpt || ""}
												/>
												{index < authorPosts.length - 1 && <Separator />}
											</React.Fragment>
										))}
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
