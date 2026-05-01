export interface RecipeDetails {
	prepTime?: number | null;
	cookTime?: number | null;
	totalTime?: number | null;
	calories?: number | null;
	servings?: number | null;
	cost?: number | null;
	ingredients?: string | null;
	instructions?: string | null;
	notes?: string | null;
	nutrition?: string | null;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface FeaturedImage {
	node: {
		sourceUrl: string;
		altText: string;
	};
}

// ─── Author ───────────────────────────────────────────────────────────────────

export interface Author {
	node: {
		name: string;
		slug: string;
	};
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	count: number;
}

export interface CategoryRef {
	name: string;
	slug: string;
}

// ─── Seo ─────────────────────────────────────────────────────────────────

export interface Seo {
	title?: string;
	description?: string;
	focusKeywords?: string[];
	canonicalUrl?: string;
	openGraph?: {
		title?: string;
		description?: string;
		image?: {
			url?: string;
		};
	};
}

// ─── Post / Recipe ────────────────────────────────────────────────────────────

export interface Recipe {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	content?: string;
	featuredImage?: FeaturedImage | null;
	author?: Author | null;
	categories?: { nodes: CategoryRef[] } | null;
	seo?: Seo;
	recipeDetails?: RecipeDetails | null;
}

// ─── API response wrappers ────────────────────────────────────────────────────

export interface RecipesData {
	posts: { nodes: Recipe[] };
}

export interface RecipeData {
	postBy: Recipe;
}

export interface CategoriesData {
	categories: { nodes: Category[] };
}

export interface CategoryWithPosts {
	name: string;
	description: string;
	slug: string;
	posts: { nodes: Recipe[] };
}

export interface CategoryData {
	category: CategoryWithPosts;
}

// ─── Parsed types (used inside RecipeCard) ────────────────────────────────────

export interface ParsedIngredient {
	amount?: string;
	unit?: string;
	name: string;
	notes?: string;
	/** "header" = this is a "## Section" group label, not an actual ingredient */
	group?: "header";
}

export interface ParsedInstruction {
	step: number;
	text: string;
	/** "header" = section label line starting with ## */
	group?: "header";
}
