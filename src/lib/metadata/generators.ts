import type { Metadata } from "next";
import type { DummyRecipe } from "@/lib/dummy-data";
import { siteConfig } from "./site-config";

// ── Base metadata ─────────────────────────────────────────────
export function generateBaseMetadata(): Metadata {
	return {
		metadataBase: new URL(siteConfig.url),
		title: {
			default: siteConfig.title,
			template: `%s | ${siteConfig.shortName}`,
		},
		description: siteConfig.description,
		keywords: [...siteConfig.keywords],
		authors: [{ name: siteConfig.creator.name, url: siteConfig.url }],
		creator: siteConfig.creator.name,
		publisher: siteConfig.name,
		applicationName: siteConfig.name,
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		openGraph: {
			type: "website",
			locale: "en_US",
			url: siteConfig.url,
			title: siteConfig.title,
			description: siteConfig.description,
			siteName: siteConfig.name,
			images: [
				{
					url: siteConfig.ogImage,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: siteConfig.title,
			description: siteConfig.description,
			site: siteConfig.creator.twitter,
			creator: siteConfig.creator.twitter,
			images: [siteConfig.twitterImage],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		icons: {
			icon: [
				{ url: "/favicon.ico" },
				{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
				{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			],
			shortcut: "/favicon-16x16.png",
			apple: [
				{ url: "/apple-touch-icon.png" },
				{
					url: "/apple-touch-icon-180x180.png",
					sizes: "180x180",
					type: "image/png",
				},
			],
		},
		manifest: "/site.webmanifest",
		alternates: {
			canonical: siteConfig.url,
			types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
		},
		category: "food",
	};
}

// ── Homepage ──────────────────────────────────────────────────
export function generateHomeMetadata(): Metadata {
	return {
		title: siteConfig.title,
		description: siteConfig.description,
		keywords: [
			...siteConfig.keywords,
			"quick global recipes",
			"easy family dinners",
			"30 minute meals",
			"world flavours at home",
		],
		alternates: { canonical: siteConfig.url },
	};
}

// ── Category pages ────────────────────────────────────────────
export function generateCategoryMetadata(categorySlug: string): Metadata {
	const category =
		siteConfig.categories[categorySlug as keyof typeof siteConfig.categories];

	if (!category) return generateBaseMetadata();

	const url = `${siteConfig.url}/category/${category.slug}`;

	return {
		title: category.title,
		description: category.description,
		keywords: [...siteConfig.keywords, ...category.keywords],
		alternates: { canonical: url },
		openGraph: {
			title: category.title,
			description: category.description,
			url: url,
			type: "website",
			siteName: siteConfig.name,
		},
		twitter: {
			card: "summary_large_image",
			title: category.title,
			description: category.description,
			site: siteConfig.creator.twitter,
		},
	};
}

// ── Blog / recipe post pages ──────────────────────────────────
// Accepts DummyRecipe now — swap for WPGraphQL post type when ready
export function generateBlogPostMetadata(post: DummyRecipe | null): Metadata {
	if (!post) return {};

	const url = `${siteConfig.url}/blog/${post.slug}`;
	const imageUrl = post.mainImage?.url ?? undefined;

	return {
		title: post.title || "Recipe",
		description: post.excerpt || siteConfig.description,
		keywords: [
			...siteConfig.keywords,
			post.category?.title?.toLowerCase() ?? "",
			"recipe",
			"easy recipe",
		].filter(Boolean),
		authors: post.author?.name ? [{ name: post.author.name }] : [],
		alternates: { canonical: url },
		openGraph: {
			title: post.title || "Recipe",
			description: post.excerpt || siteConfig.description,
			type: "article",
			publishedTime: post.publishedAt || undefined,
			authors: post.author?.name ? [post.author.name] : [],
			url: url,
			siteName: siteConfig.name,
			...(imageUrl && {
				images: [
					{
						url: imageUrl,
						width: 1200,
						height: 630,
						alt: post.mainImage?.alt || post.title || "Recipe image",
					},
				],
			}),
		},
		twitter: {
			card: "summary_large_image",
			title: post.title || "Recipe",
			description: post.excerpt || siteConfig.description,
			...(imageUrl && { images: [imageUrl] }),
			site: siteConfig.creator.twitter,
			creator: siteConfig.creator.twitter,
		},
	};
}

// ── About page ────────────────────────────────────────────────
export function generateAboutMetadata(): Metadata {
	const url = `${siteConfig.url}/about-us`;

	return {
		title: `About ${siteConfig.shortName}`,
		description: `Meet Sarah Mitchell — the home cook behind The Daily Flavour. Quick, globally-inspired recipes for busy families, made with real ingredients and zero fuss.`,
		keywords: [
			...siteConfig.keywords,
			"about The Daily Flavour",
			"recipe blogger",
			"home cook",
			"family recipe blog",
		],
		alternates: { canonical: url },
		openGraph: {
			title: `About ${siteConfig.name}`,
			description: siteConfig.branding.mission,
			url: url,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `About ${siteConfig.name}`,
			description: siteConfig.branding.mission,
			site: siteConfig.creator.twitter,
		},
	};
}

// ── Contact page ──────────────────────────────────────────────
export function generateContactMetadata(): Metadata {
	const url = `${siteConfig.url}/contact`;

	return {
		title: "Contact Us",
		description: `Get in touch with ${siteConfig.name}. Recipe questions, collaborations, or just want to say hello — we'd love to hear from you.`,
		keywords: [
			...siteConfig.keywords,
			"contact The Daily Flavour",
			"recipe questions",
			"food blog contact",
		],
		alternates: { canonical: url },
		openGraph: {
			title: `Contact ${siteConfig.name}`,
			description: `Have a recipe question or collaboration idea? Reach out to the ${siteConfig.name} team.`,
			url: url,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `Contact ${siteConfig.name}`,
			description: "Get in touch with The Daily Flavour.",
		},
	};
}

// ── Author pages ──────────────────────────────────────────────
export function generateAuthorMetadata(
	authorName: string,
	authorBio: string,
	authorSlug: string,
): Metadata {
	const url = `${siteConfig.url}/author/${authorSlug}`;

	return {
		title: `${authorName} — ${siteConfig.shortName}`,
		description: authorBio,
		keywords: [
			...siteConfig.keywords,
			authorName.toLowerCase(),
			"recipe creator",
			"food blogger",
			"home cook",
		],
		alternates: { canonical: url },
		openGraph: {
			title: `${authorName} — ${siteConfig.shortName}`,
			description: authorBio,
			url: url,
			type: "profile",
		},
		twitter: {
			card: "summary",
			title: `${authorName} — Recipe Creator`,
			description: authorBio,
		},
	};
}

// ── Search page ───────────────────────────────────────────────
export function generateSearchMetadata(
	query?: string,
	category?: string,
): Metadata {
	const url = `${siteConfig.url}/search`;

	let title: string;
	let description: string;

	if (query && category) {
		const categoryData =
			siteConfig.categories[category as keyof typeof siteConfig.categories];
		title = `Search: "${query}" in ${categoryData?.title || category}`;
		description = `Search results for "${query}" in ${categoryData?.title || category}. Find quick global recipes on The Daily Flavour.`;
	} else if (query) {
		title = `Search Results: "${query}"`;
		description = `Search results for "${query}". Discover quick global recipes, weeknight dinners, and family-friendly meals on The Daily Flavour.`;
	} else if (category) {
		const categoryData =
			siteConfig.categories[category as keyof typeof siteConfig.categories];
		title = `Search ${categoryData?.title || category}`;
		description =
			categoryData?.description ||
			`Browse ${category} recipes on The Daily Flavour`;
	} else {
		title = "Search Recipes";
		description = `Search ${siteConfig.name} for quick global recipes, weeknight dinners, breakfast ideas, desserts and more.`;
	}

	return {
		title,
		description,
		keywords: [
			...siteConfig.keywords,
			"search recipes",
			"find recipes",
			"recipe search",
		],
		alternates: { canonical: url },
		robots: { index: false, follow: true },
		openGraph: { title, description, url, type: "website" },
		twitter: { card: "summary", title, description },
	};
}
