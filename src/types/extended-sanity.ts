import type { PortableTextBlock } from "sanity";
import type {
	IS_FEATURED_POSTS_QUERYResult,
	IS_TRENDING_POSTS_QUERYResult,
	POST_QUERYResult,
} from "@/sanity/types";

// ✅ FAQ Block type
export interface FAQItem {
	question: string;
	answer: PortableTextBlock[];
}

export interface FAQBlock {
	_type: "faqBlock";
	_key: string;
	title?: string;
	faqs: FAQItem[];
}

// ✅ Table of Contents Heading type
export interface TableOfContentHeading {
	id: string;
	text: string;
	level: "h2" | "h3" | "h4";
}

// ✅ Table of Contents config type
export interface TableOfContentsConfig {
	enabled?: boolean;
	title?: string;
}

// ✅ Extract the body array type from POST_QUERYResult
type OriginalBodyBlock = NonNullable<
	NonNullable<POST_QUERYResult>["body"]
>[number];

// ✅ Extended body type including FAQ
export type ExtendedBodyBlock = OriginalBodyBlock | FAQBlock;

// ✅ Extended Post type with FAQ support and tableOfContents (for single post detail page)
export type ExtendedPost = Omit<NonNullable<POST_QUERYResult>, "body"> & {
	body: ExtendedBodyBlock[] | null;
	tableOfContents?: TableOfContentsConfig;
};

// ✅ Featured Post type (for lists/cards)
export type FeaturedPost = IS_FEATURED_POSTS_QUERYResult[number];

// ✅ Trending Post type (for lists/cards)
export type TrendingPost = IS_TRENDING_POSTS_QUERYResult[number];

// ✅ Or create a more specific type for BlogCard
export interface BlogCardPost {
	title: string | null;
	slug: string | null;
	publishedAt: string | null;
	excerpt: string | null;
	mainImage: {
		asset: {
			_id: string;
			url: string | null;
		} | null;
		alt: string | null;
	} | null;
	category: {
		title: string | null;
		slug: string | null;
	} | null;
	author: {
		name: string | null;
		slug: string | null;
	} | null;
}
