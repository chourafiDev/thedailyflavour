export * from "./generators";
export * from "./schemas";
export * from "./site-config";

// Convenience function to render JSON-LD schema
export function renderJsonLd(schema: object) {
	return {
		__html: JSON.stringify(schema),
	};
}
