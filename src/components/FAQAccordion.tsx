"use client";

import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { Info } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
	question: string;
	answer: string | PortableTextBlock[];
}

interface FAQAccordionProps {
	title?: string;
	faqs: FAQ[];
}

export default function FAQAccordion({
	title = "FAQs",
	faqs,
}: FAQAccordionProps) {
	return (
		<div className="my-10 border-t border-b py-5">
			<div className="flex items-center gap-3">
				<Info className="text-foreground size-7" />
				<h2 className="text-3xl font-bold my-4">{title}</h2>
			</div>
			<Accordion type="single" collapsible className="w-full space-y-0">
				{faqs.map((faq, index) => (
					<AccordionItem
						key={index}
						value={`item-${index}`}
						className="bg-white"
					>
						<AccordionTrigger className="py-4 text-left font-extrabold text-lg">
							{faq.question}
						</AccordionTrigger>
						<AccordionContent className="text-foreground/70 leading-6 text-base prose prose-sm max-w-none">
							{typeof faq.answer === "string" ? (
								faq.answer
							) : (
								<PortableText value={faq.answer} />
							)}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
