import { client } from "@/lib/client";
import {
	GET_ALL_AUTHORS,
	GET_ALL_CATEGORIES,
	GET_ALL_RECIPES,
	GET_AUTHOR_BY_SLUG,
	GET_RECIPES_BY_CATEGORY as GET_CATEGORY_WITH_POSTS,
	GET_RECIPE_BY_SLUG,
	GET_RECIPES_BY_CATEGORY,
} from "@/lib/queries";

// ── Recipes ───────────────────────────────────────────────────

// Fetch all recipes
export async function getAllRecipes() {
	try {
		const data = await client.request(GET_ALL_RECIPES);
		return data.posts.nodes;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		return [];
	}
}

// Fetch single recipe by slug
export async function getRecipeBySlug(slug: string) {
	try {
		const data = await client.request(GET_RECIPE_BY_SLUG, { slug });
		return data.postBy;
	} catch (error) {
		console.error("Error fetching recipe:", error);
		return null;
	}
}

// Fetch recipes by category slug
export async function getRecipesByCategory(categorySlug: string) {
	try {
		const data = await client.request(GET_RECIPES_BY_CATEGORY, {
			slug: categorySlug,
		});
		return data.category?.posts?.nodes ?? [];
	} catch (error) {
		console.error("Error fetching recipes by category:", error);
		return [];
	}
}

// Fetch featured recipes (isFeatured = true) — limit optional
export async function getFeaturedRecipes(quantity = 5) {
	try {
		const data = await client.request(GET_ALL_RECIPES);
		return data.posts.nodes.slice(0, quantity);
	} catch (error) {
		console.error("Error fetching featured recipes:", error);
		return [];
	}
}

// Fetch trending recipes — limit optional
export async function getTrendingRecipes(quantity = 4) {
	try {
		const data = await client.request(GET_ALL_RECIPES);
		return data.posts.nodes.slice(0, quantity);
	} catch (error) {
		console.error("Error fetching trending recipes:", error);
		return [];
	}
}

// Fetch related recipes — same category, exclude current slug
export async function getRelatedRecipes(
	categorySlug: string,
	currentSlug: string,
	quantity = 4,
) {
	try {
		const data = await client.request(GET_RECIPES_BY_CATEGORY, {
			slug: categorySlug,
		});
		return (
			data.category?.posts?.nodes
				?.filter((p: { slug: string }) => p.slug !== currentSlug)
				?.slice(0, quantity) ?? []
		);
	} catch (error) {
		console.error("Error fetching related recipes:", error);
		return [];
	}
}

// Fetch previous post (by date — post before current)
export async function getPreviousRecipe(currentSlug: string) {
	try {
		const data = await client.request(GET_ALL_RECIPES);
		const posts = data.posts.nodes;
		const index = posts.findIndex(
			(p: { slug: string }) => p.slug === currentSlug,
		);
		return index > 0 ? posts[index - 1] : null;
	} catch (error) {
		console.error("Error fetching previous recipe:", error);
		return null;
	}
}

// Fetch next post (by date — post after current)
export async function getNextRecipe(currentSlug: string) {
	try {
		const data = await client.request(GET_ALL_RECIPES);
		const posts = data.posts.nodes;
		const index = posts.findIndex(
			(p: { slug: string }) => p.slug === currentSlug,
		);
		return index !== -1 && index < posts.length - 1 ? posts[index + 1] : null;
	} catch (error) {
		console.error("Error fetching next recipe:", error);
		return null;
	}
}

// ── Categories ────────────────────────────────────────────────

// Fetch all categories
export async function getAllCategories() {
	try {
		const data = await client.request(GET_ALL_CATEGORIES);
		return data.categories.nodes;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
}

// Fetch single category with its posts
export async function getCategoryWithPosts(slug: string) {
	try {
		const data = await client.request(GET_CATEGORY_WITH_POSTS, { slug });
		return data.category ?? null;
	} catch (error) {
		console.error("Error fetching category with posts:", error);
		return null;
	}
}

// ── Search ────────────────────────────────────────────────────

// Search recipes by term and/or category
export async function searchRecipes(query?: string, categorySlug?: string) {
	try {
		// If category provided, fetch by category first then filter
		if (categorySlug) {
			const data = await client.request(GET_RECIPES_BY_CATEGORY, {
				slug: categorySlug,
			});
			const posts = data.category?.posts?.nodes ?? [];
			if (!query) return posts;
			return posts.filter(
				(p: { title: string; excerpt: string }) =>
					p.title?.toLowerCase().includes(query.toLowerCase()) ||
					p.excerpt?.toLowerCase().includes(query.toLowerCase()),
			);
		}

		// Otherwise fetch all and filter by query
		const data = await client.request(GET_ALL_RECIPES);
		const posts = data.posts.nodes;
		if (!query) return posts;
		return posts.filter(
			(p: { title: string; excerpt: string }) =>
				p.title?.toLowerCase().includes(query.toLowerCase()) ||
				p.excerpt?.toLowerCase().includes(query.toLowerCase()),
		);
	} catch (error) {
		console.error("Error searching recipes:", error);
		return [];
	}
}

// ── Author ────────────────────────────────────────────────────

// Fetch single author with their posts
export async function getAuthorBySlug(slug: string) {
	try {
		const data = await client.request(GET_AUTHOR_BY_SLUG, { slug });
		return data.user ?? null;
	} catch (error) {
		console.error("Error fetching author:", error);
		return null;
	}
}

// Fetch all authors
export async function getAllAuthors() {
	try {
		const data = await client.request(GET_ALL_AUTHORS);
		return data.users.nodes;
	} catch (error) {
		console.error("Error fetching authors:", error);
		return [];
	}
}
