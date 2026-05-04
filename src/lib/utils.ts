import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

import type { TableOfContentHeading } from "@/components/table-of-content";

export function extractHeadings(html: string): {
	headings: TableOfContentHeading[];
	content: string;
} {
	const headings: TableOfContentHeading[] = [];

	// Match h2, h3, h4 tags — captures existing id if present, plus inner text
	const enriched = html.replace(
		/<(h2|h3|h4)([^>]*)>(.*?)<\/(h2|h3|h4)>/gi,
		(match, tag: string, attrs: string, inner: string) => {
			// Strip any HTML tags inside the heading to get plain text
			const text = inner.replace(/<[^>]*>/g, "").trim();
			if (!text) return match;

			// Use existing id or generate a slug from the text
			const existingId = attrs.match(/id=["']([^"']+)["']/)?.[1];
			const id =
				existingId ||
				text
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-|-$/g, "");

			headings.push({
				id,
				text,
				level: tag.toLowerCase() as "h2" | "h3" | "h4",
			});

			// Inject the id into the heading tag if not already there
			const newAttrs = existingId ? attrs : `${attrs} id="${id}"`;
			return `<${tag}${newAttrs}>${inner}</${tag}>`;
		},
	);

	return { headings, content: enriched };
}

export function formatTime(minutes?: number | null): string {
	if (!minutes) return "—";
	if (minutes < 60) return `${minutes} min`;
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function parseNutrition(raw?: string | null) {
	if (!raw) return undefined;
	const lines = raw
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean);
	const get = (key: string) =>
		lines
			.find((l) => l.toLowerCase().startsWith(key))
			?.split(":")[1]
			?.trim();

	return {
		"@type": "NutritionInformation",
		calories: get("calories") ? `${get("calories")} calories` : undefined,
		proteinContent: get("protein"),
		fatContent: get("fat"),
		carbohydrateContent: get("carbohydrate"),
		fiberContent: get("fiber"),
		sugarContent: get("sugar"),
		sodiumContent: get("sodium"),
		cholesterolContent: get("cholesterol"),
		saturatedFatContent: get("saturated fat") ?? get("saturatedfat"),
	};
}
