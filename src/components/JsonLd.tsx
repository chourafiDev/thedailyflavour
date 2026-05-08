// components/JsonLd.tsx

// Define all possible JSON-LD schema types
type JsonLdSchema =
	| WebSiteSchema
	| BlogPostingSchema
	| BreadcrumbListSchema
	| CollectionPageSchema
	| FAQPageSchema
	| ItemListSchema
	| HowToSchema
	| ReviewSchema
	| OrganizationSchema
	| PersonSchema
	| RecipeSchema
	| Record<string, JsonValue>;

// Define JSON value types
type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

// Base schema type
interface BaseSchema {
	"@context": string;
	"@type": string;
}

// Specific schema types
interface WebSiteSchema extends BaseSchema {
	"@type": "WebSite";
	name: string;
	url: string;
	description?: string;
	publisher?: OrganizationSchema;
	potentialAction?: {
		"@type": string;
		target: string | { "@type": string; urlTemplate: string };
		"query-input"?: string;
	};
}

export interface RecipeSchema extends BaseSchema {
	"@type": "Recipe";
	name: string;
	description?: string;
	image?:
		| string
		| string[]
		| { "@type": "ImageObject"; url: string; alt?: string };
	author?: { "@type": string; name: string; url?: string };
	datePublished?: string;
	prepTime?: string;
	cookTime?: string;
	totalTime?: string;
	recipeYield?: string | string[];
	recipeCategory?: string;
	recipeCuisine?: string;
	keywords?: string[];
	recipeIngredient?: string[];
	recipeInstructions?: {
		"@type": string;
		position?: number;
		name?: string;
		text: string;
	}[];
	nutrition?: {
		"@type": string;
		calories?: string;
		proteinContent?: string;
		fatContent?: string;
		carbohydrateContent?: string;
		fiberContent?: string;
		sugarContent?: string;
		sodiumContent?: string;
		cholesterolContent?: string;
		saturatedFatContent?: string;
	};
	publisher?: { "@type": string; name: string };
	aggregateRating?: {
		"@type": string;
		ratingValue: string;
		ratingCount: string;
	};
	inLanguage: string;
}

interface BlogPostingSchema extends BaseSchema {
	"@type": "BlogPosting";
	headline: string;
	description: string;
	image?: string | ImageObject;
	author: PersonSchema;
	publisher: OrganizationSchema;
	datePublished: string;
	dateModified?: string;
	mainEntityOfPage?: {
		"@type": string;
		"@id": string;
	};
	keywords?: string;
	articleSection?: string;
	inLanguage?: string;
}

interface BreadcrumbListSchema extends BaseSchema {
	"@type": "BreadcrumbList";
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		name: string;
		item: string;
	}>;
}

interface CollectionPageSchema extends BaseSchema {
	"@type": "CollectionPage";
	name: string;
	description: string;
	url: string;
	publisher?: OrganizationSchema;
	inLanguage?: string;
}

interface FAQPageSchema extends BaseSchema {
	"@type": "FAQPage";
	mainEntity: Array<{
		"@type": "Question";
		name: string;
		acceptedAnswer: {
			"@type": "Answer";
			text: string;
		};
	}>;
}

interface ItemListSchema extends BaseSchema {
	"@type": "ItemList";
	name: string;
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		name: string;
		url: string;
		description?: string;
	}>;
}

interface HowToSchema extends BaseSchema {
	"@type": "HowTo";
	name: string;
	description: string;
	step: Array<{
		"@type": "HowToStep";
		position: number;
		name: string;
		text: string;
		image?: string;
	}>;
}

interface ReviewSchema extends BaseSchema {
	"@type": "Review";
	itemReviewed: {
		"@type": string;
		name: string;
	};
	author: {
		"@type": "Person";
		name: string;
	};
	reviewRating: {
		"@type": "Rating";
		ratingValue: number;
		bestRating: number;
	};
	reviewBody: string;
}

interface OrganizationSchema extends BaseSchema {
	"@type": "Organization";
	name: string;
	url: string;
	logo: ImageObject;
	sameAs?: string[];
}

interface PersonSchema extends BaseSchema {
	"@type": "Person";
	name: string;
	url?: string;
	image?: string;
}

interface ImageObject {
	"@type": "ImageObject";
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

// Component props
interface JsonLdProps {
	data: JsonLdSchema | JsonLdSchema[];
	id?: string;
}

/**
 * JsonLd Component for structured data.
 *
 * Renders a server-side <script type="application/ld+json"> tag in the HTML.
 *
 * IMPORTANT: Do NOT use next/script for JSON-LD. next/script is designed for
 * executable JavaScript and processes its children through Next.js's hydration
 * pipeline (the __next_s push pattern), which can mangle or truncate large
 * JSON-LD payloads — especially nested arrays and objects (ingredients,
 * instructions, nutrition). A plain <script> tag with dangerouslySetInnerHTML
 * is the official Next.js recommendation for structured data:
 * https://nextjs.org/docs/app/guides/json-ld
 *
 * @param data - JSON-LD schema object or array of schemas
 * @param id   - Optional unique identifier for the script tag
 */
export function JsonLd({ data, id }: JsonLdProps) {
	// Validate data
	if (!data) {
		if (process.env.NODE_ENV !== "production") {
			console.warn("JsonLd: No data provided");
		}
		return null;
	}

	if (
		typeof data === "object" &&
		!Array.isArray(data) &&
		Object.keys(data).length === 0
	) {
		if (process.env.NODE_ENV !== "production") {
			console.warn("JsonLd: Empty object provided");
		}
		return null;
	}

	if (Array.isArray(data) && data.length === 0) {
		if (process.env.NODE_ENV !== "production") {
			console.warn("JsonLd: Empty array provided");
		}
		return null;
	}

	let jsonString: string;
	try {
		// Strip undefined values automatically (JSON.stringify drops them).
		jsonString = JSON.stringify(data);
	} catch (error) {
		console.error("JsonLd: Failed to stringify data", error);
		return null;
	}

	// XSS hardening: escape `<` so an injected "</script>" string in user data
	// can't break out of the script tag. Next.js docs explicitly recommend this.
	const safeJson = jsonString.replace(/</g, "\\u003c");

	return (
		<script
			id={id}
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted server-rendered JSON-LD
			dangerouslySetInnerHTML={{ __html: safeJson }}
		/>
	);
}

// Export types for use in other files
export type {
	JsonLdSchema,
	WebSiteSchema,
	BlogPostingSchema,
	BreadcrumbListSchema,
	CollectionPageSchema,
	FAQPageSchema,
	ItemListSchema,
	HowToSchema,
	ReviewSchema,
	OrganizationSchema,
	PersonSchema,
	ImageObject,
};
