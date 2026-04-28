import type { MetadataRoute } from "next";
import {
	getAllAuthors,
	getAllCategories,
	getAllRecipes,
} from "@/lib/wordpress";

export const revalidate = 3600;
export const dynamic = "force-static";

const baseUrl = "https://thedailyflavour.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const now = new Date();

	// ── Static pages ──────────────────────────────────────────
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
		lastModified: now,
		changeFrequency: "weekly",
		priority: p === "/" ? 1 : 0.7,
	}));

	// ── Recipe posts ──────────────────────────────────────────
	const posts = await getAllRecipes().catch(() => []);

	const postEntries: MetadataRoute.Sitemap = posts.map(
		(r: { slug: string; date?: string }) => ({
			url: `${baseUrl}/blog/${r.slug}`,
			lastModified: r.date ? new Date(r.date) : now,
			changeFrequency: "weekly",
			priority: 0.8,
		}),
	);

	// ── Category pages ────────────────────────────────────────
	const categories = await getAllCategories().catch(() => []);

	const categoryEntries: MetadataRoute.Sitemap = categories.map(
		(c: { slug: string }) => ({
			url: `${baseUrl}/category/${c.slug}`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.6,
		}),
	);

	// ── Author pages ──────────────────────────────────────────
	const authors = await getAllAuthors().catch(() => []);

	const authorEntries: MetadataRoute.Sitemap = authors.map(
		(a: { slug: string }) => ({
			url: `${baseUrl}/author/${a.slug}`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.5,
		}),
	);

	return [
		...staticEntries,
		...postEntries,
		...categoryEntries,
		...authorEntries,
	];
}
