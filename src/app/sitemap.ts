import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

type Doc = { slug: string; _updatedAt?: string };

export const revalidate = 3600;
export const dynamic = "force-static";

const baseUrl = "https://solofemalevoyage.com";

// --- GROQ QUERIES ---
const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`;

const CATEGORIES_QUERY = `
  *[_type == "category" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`;

const AUTHORS_QUERY = `
  *[_type == "author" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// 1) Static routes you want indexed
	const staticPaths = [
		"/",
		"/about-us",
		"/contact",
		"/disclaimer",
		"/privacy-policy",
		"/terms",
	];

	const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
		url: `${baseUrl}${p}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: p === "/" ? 1 : 0.7,
	}));

	// 2) Dynamic: posts, categories, authors
	const [posts, categories, authors] = await Promise.all([
		client.fetch<Doc[]>(POSTS_QUERY),
		client.fetch<Doc[]>(CATEGORIES_QUERY),
		client.fetch<Doc[]>(AUTHORS_QUERY),
	]);

	const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
		url: `${baseUrl}/blog/${p.slug}`,
		lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
		url: `${baseUrl}/category/${c.slug}`,
		lastModified: c._updatedAt ? new Date(c._updatedAt) : new Date(),
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	const authorEntries: MetadataRoute.Sitemap = authors.map((a) => ({
		url: `${baseUrl}/author/${a.slug}`,
		lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
		changeFrequency: "monthly",
		priority: 0.5,
	}));

	return [
		...staticEntries,
		...postEntries,
		...categoryEntries,
		...authorEntries,
	];
}
