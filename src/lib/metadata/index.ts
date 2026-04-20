// Export everything from one place for easy imports
export * from "./site-config";
export * from "./generators";
export * from "./schemas";
export type { BlogPost, CategoryInfo } from "@/types/metadata";

// Convenience function to render JSON-LD schema
export function renderJsonLd(schema: object) {
	return {
		__html: JSON.stringify(schema),
	};
}
