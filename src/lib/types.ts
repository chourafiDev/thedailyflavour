// ─── Recipe fields ───────────────────────────────
export interface RecipeDetails {
	prepTime: number;
	cookTime: number;
	servings: number;
	calories: number;
	cuisine: string;
	difficulty: string;
	ingredients: string;
	instructions: string;
}

export interface FeaturedImage {
	node: {
		sourceUrl: string;
		altText: string;
	};
}

export interface Recipe {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	content: string;
	featuredImage: FeaturedImage;
	recipeDetails: RecipeDetails;
}

// ─── API response wrappers ────────────────────────
export interface RecipesData {
	posts: {
		nodes: Recipe[];
	};
}

export interface RecipeData {
	postBy: Recipe;
}

// ─── Category types ───────────────────────────────
export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	count: number;
}

export interface CategoriesData {
	categories: {
		nodes: Category[];
	};
}

export interface CategoryWithPosts {
	name: string;
	description: string;
	slug: string;
	posts: {
		nodes: Recipe[];
	};
}

export interface CategoryData {
	category: CategoryWithPosts;
}
