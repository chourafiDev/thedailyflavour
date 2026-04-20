import type { ExtendedBodyBlock, FAQBlock } from "@/types/extended-sanity";

export function isFAQBlock(block: ExtendedBodyBlock): block is FAQBlock {
	return block._type === "faqBlock";
}
