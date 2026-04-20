import type {
	BreadcrumbListSchema,
	CollectionPageSchema,
	FAQPageSchema,
	HowToSchema,
	ItemListSchema,
	OrganizationSchema,
	PersonSchema,
	ReviewSchema,
	WebSiteSchema,
} from "@/components/JsonLd";
import type { DummyRecipe } from "@/lib/dummy-data";
import { siteConfig } from "./site-config";

// ── Organization ──────────────────────────────────────────────
export function generateOrganizationSchema(): OrganizationSchema {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteConfig.name,
		url: siteConfig.url,
		logo: {
			"@type": "ImageObject",
			url: `${siteConfig.url}/logo.png`,
		},
		sameAs: [siteConfig.links.instagram, siteConfig.links.pinterest],
	};
}

// ── Person ────────────────────────────────────────────────────
export function generatePersonSchema(): PersonSchema {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteConfig.creator.name,
		url: siteConfig.url,
		image: `${siteConfig.url}/author.jpg`,
	};
}

// ── WebSite ───────────────────────────────────────────────────
export function generateWebsiteSchema(): WebSiteSchema {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		publisher: generateOrganizationSchema(),
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

// ── Recipe / BlogPosting schema ───────────────────────────────
// Uses DummyRecipe — swap for WPGraphQL post type when WordPress is live
export function generateBlogPostingSchema(post: DummyRecipe | null) {
	if (!post) return {};

	const keywords = [
		"quick recipes",
		"family recipes",
		post.category?.title?.toLowerCase(),
		post.recipeDetails?.cuisine?.toLowerCase(),
		"easy recipe",
		"weeknight dinner",
	]
		.filter(Boolean)
		.join(", ");

	return {
		"@context": "https://schema.org",
		"@type": "Recipe",
		name: post.title || "Recipe",
		description: post.excerpt || siteConfig.description,
		image: {
			"@type": "ImageObject",
			url: post.mainImage?.url || `${siteConfig.url}/default-image.jpg`,
			alt: post.mainImage?.alt || post.title || "Recipe image",
		},
		author: {
			"@type": "Person",
			name: post.author?.name || siteConfig.creator.name,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
		datePublished: post.publishedAt,
		dateModified: post.publishedAt,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteConfig.url}/blog/${post.slug}`,
		},
		keywords,
		recipeCuisine: post.recipeDetails?.cuisine || "",
		recipeCategory: post.category?.title || "",
		prepTime: `PT${post.recipeDetails?.prepTime || 0}M`,
		cookTime: `PT${post.recipeDetails?.cookTime || 0}M`,
		totalTime: `PT${(post.recipeDetails?.prepTime || 0) + (post.recipeDetails?.cookTime || 0)}M`,
		recipeYield: `${post.recipeDetails?.servings || 4} servings`,
		inLanguage: "en-US",
	};
}

// ── BreadcrumbList ────────────────────────────────────────────
export function generateBreadcrumbSchema(
	items: Array<{ name: string; url: string }>,
): BreadcrumbListSchema {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url.startsWith("http")
				? item.url
				: `${siteConfig.url}${item.url}`,
		})),
	};
}

// ── CollectionPage ────────────────────────────────────────────
export function generateCollectionPageSchema(
	category: string,
	description: string,
): CollectionPageSchema {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: category,
		description: description,
		url: `${siteConfig.url}/category/${category.toLowerCase()}`,
		publisher: generateOrganizationSchema(),
		inLanguage: "en-US",
	};
}

// ── FAQPage ───────────────────────────────────────────────────
export function generateFAQSchema(
	faqs: Array<{ question: string; answer: string }>,
): FAQPageSchema {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

// ── ItemList ──────────────────────────────────────────────────
export function generateItemListSchema(
	items: Array<{ name: string; url: string; description?: string }>,
	listName: string,
): ItemListSchema {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: listName,
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			url: item.url.startsWith("http")
				? item.url
				: `${siteConfig.url}${item.url}`,
			description: item.description,
		})),
	};
}

// ── HowTo ─────────────────────────────────────────────────────
export function generateHowToSchema(
	title: string,
	description: string,
	steps: Array<{ name: string; text: string; image?: string }>,
): HowToSchema {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: title,
		description: description,
		step: steps.map((step, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: step.name,
			text: step.text,
			image: step.image ? `${siteConfig.url}${step.image}` : undefined,
		})),
	};
}

// ── Review ────────────────────────────────────────────────────
export function generateReviewSchema(
	itemName: string,
	rating: number,
	reviewBody: string,
	author: string = siteConfig.creator.name,
): ReviewSchema {
	return {
		"@context": "https://schema.org",
		"@type": "Review",
		itemReviewed: {
			"@type": "Thing",
			name: itemName,
		},
		author: {
			"@type": "Person",
			name: author,
		},
		reviewRating: {
			"@type": "Rating",
			ratingValue: rating,
			bestRating: 5,
		},
		reviewBody,
	};
}

// ── Contact page ──────────────────────────────────────────────
export function generateContactPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: `Contact ${siteConfig.name}`,
		description: `Contact page for ${siteConfig.name} — Quick global recipes for busy families`,
		url: `${siteConfig.url}/contact`,
		mainEntity: {
			"@type": "Organization",
			name: siteConfig.name,
			alternateName: siteConfig.shortName,
			description: siteConfig.branding.tagline,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
			contactPoint: [
				{
					"@type": "ContactPoint",
					email: siteConfig.contact.email,
					contactType: "Customer Service",
					availableLanguage: ["English"],
				},
			],
			sameAs: [
				siteConfig.social.instagram.url,
				siteConfig.social.pinterest.url,
				siteConfig.social.tiktok.url,
			],
		},
	};
}

// ── Search page ───────────────────────────────────────────────
export function generateSearchPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "SearchResultsPage",
		name: `Search ${siteConfig.name}`,
		description: `Search page for ${siteConfig.name} — Find quick global recipes and weeknight dinner ideas`,
		url: `${siteConfig.url}/search`,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};
}

// ── Generic WebPage ───────────────────────────────────────────
export function generateWebPageSchema(
	pageName: string,
	description: string,
	path: string,
) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: pageName,
		description: description,
		url: `${siteConfig.url}${path}`,
		isPartOf: {
			"@type": "WebSite",
			name: siteConfig.name,
			url: siteConfig.url,
		},
		about: {
			"@type": "Organization",
			name: siteConfig.name,
			description: siteConfig.branding.mission,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};
}

// ── Author Person schema ──────────────────────────────────────
export function generateAuthorSchema(author: {
	name: string;
	slug: string;
	bio: string;
	image: string;
	jobTitle: string;
	location: string;
	email: string;
	social?: {
		instagram?: string;
		twitter?: string;
		pinterest?: string;
		facebook?: string;
	};
}) {
	const sameAs: string[] = [];
	if (author.social?.instagram) sameAs.push(author.social.instagram);
	if (author.social?.twitter) sameAs.push(author.social.twitter);
	if (author.social?.pinterest) sameAs.push(author.social.pinterest);
	if (author.social?.facebook) sameAs.push(author.social.facebook);

	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: author.name,
		url: `${siteConfig.url}/author/${author.slug}`,
		image: author.image,
		jobTitle: author.jobTitle,
		description: author.bio,
		email: author.email,
		address: {
			"@type": "PostalAddress",
			addressLocality: author.location,
		},
		worksFor: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.url,
		},
		...(sameAs.length > 0 && { sameAs }),
	};
}
