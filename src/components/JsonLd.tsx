import Script from "next/script";

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
 * JsonLd Component for structured data
 * Renders JSON-LD script for SEO purposes
 * @param data - JSON-LD schema object or array of schemas
 * @param id - Optional unique identifier for the script tag
 */
export function JsonLd({ data, id }: JsonLdProps) {
	// Generate unique ID if not provided
	const scriptId =
		id || `jsonld-${Math.random().toString(36).substring(2, 11)}`;

	// Validate data
	if (!data) {
		console.warn("JsonLd: No data provided");
		return null;
	}

	if (
		typeof data === "object" &&
		!Array.isArray(data) &&
		Object.keys(data).length === 0
	) {
		console.warn("JsonLd: Empty object provided");
		return null;
	}

	if (Array.isArray(data) && data.length === 0) {
		console.warn("JsonLd: Empty array provided");
		return null;
	}

	let jsonString: string;
	try {
		jsonString = JSON.stringify(data);
	} catch (error) {
		console.error("JsonLd: Failed to stringify data", error);
		return null;
	}

	return (
		<Script
			id={scriptId}
			type="application/ld+json"
			strategy="beforeInteractive"
		>
			{jsonString}
		</Script>
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
