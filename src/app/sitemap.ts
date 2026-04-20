import type { MetadataRoute } from "next";
import { dummyCategories, dummyRecipes } from "@/lib/dummy-data";

export const revalidate = 3600;
export const dynamic = "force-static";

const baseUrl = "https://thedailyflavour.com";

export default function sitemap(): MetadataRoute.Sitemap {
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
	const postEntries: MetadataRoute.Sitemap = dummyRecipes.map((r) => ({
		url: `${baseUrl}/blog/${r.slug}`,
		lastModified: r.publishedAt ? new Date(r.publishedAt) : now,
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	// ── Category pages ────────────────────────────────────────
	const categoryEntries: MetadataRoute.Sitemap = dummyCategories.map((c) => ({
		url: `${baseUrl}/category/${c.slug}`,
		lastModified: now,
		changeFrequency: "monthly",
		priority: 0.6,
	}));

	// ── Author pages ──────────────────────────────────────────
	const authorEntries: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/author/remi`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];

	return [
		...staticEntries,
		...postEntries,
		...categoryEntries,
		...authorEntries,
	];
}
