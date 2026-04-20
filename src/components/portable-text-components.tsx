import type { PortableTextComponents as PTComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextSpan } from "sanity";
import DigitalEbook from "./digital-ebook";
import FAQAccordion from "./FAQAccordion";

/* import PortableFreeEbook from "./portable-free-ebook"; */

interface TableRow {
	_type?: string;
	_key?: string;
	cells: string[];
}

export const portableTextComponents: PTComponents = {
	block: {
		normal: ({ children }) => (
			<p className="my-2 text-foreground leading-7 text-base first:mt-0 last:mb-0">
				{children}
			</p>
		),
		h2: ({ children, value }) => {
			const text = value.children
				?.filter(
					(child): child is PortableTextSpan =>
						child._type === "span" && "text" in child,
				)
				.map((child) => child.text)
				.join("");

			const id = text
				?.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, "");

			return (
				<h2
					id={id}
					className="my-6 text-foreground font-black md:leading-[44px] leading-[35px] md:text-[30px] text-xl tracking-tight first:mt-0 last:mb-0"
				>
					{children}
				</h2>
			);
		},
		h3: ({ children, value }) => {
			const text = value.children
				?.filter(
					(child): child is PortableTextSpan =>
						child._type === "span" && "text" in child,
				)
				.map((child) => child.text)
				.join("");

			const id = text
				?.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, "");

			return (
				<h3
					id={id}
					className="my-5 md:text-[22px] text-lg font-semibold tracking-tight text-foreground first:mt-0 last:mb-0"
				>
					{children}
				</h3>
			);
		},
		h4: ({ children }) => (
			<h4 className="my-5 text-xl/8 font-semibold tracking-tight text-foreground first:mt-0 last:mb-0">
				{children}
			</h4>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-2.5 border-l-2 border-l-gray-300 pl-6 text-base/8 text-foreground first:mt-0 last:mb-0">
				{children}
			</blockquote>
		),
	},
	types: {
		image: ({ value }) => {
			const imageUrl = value?.asset?.url || value?.asset?._ref;

			if (!imageUrl) {
				return null;
			}

			return (
				<figure className="my-8">
					<Image
						alt={value.alt || ""}
						src={imageUrl}
						className="w-auto mx-auto my-8 md:h-[600px] h-[400px]"
						width={1400}
						height={1000}
					/>
				</figure>
			);
		},
		separator: ({ value }) => {
			switch (value.style) {
				case "line":
					return <hr className="my-8 border-t border-gray-200" />;
				case "space":
					return <div className="my-8" />;
				default:
					return null;
			}
		},
		table: ({ value }) => (
			<div className="overflow-x-auto my-6">
				<table className="min-w-full border-collapse border border-gray-300">
					{value.rows && value.rows.length > 0 && (
						<>
							{/* First row as headers */}
							<thead>
								<tr className="bg-soft-linen dark:bg-muted/10">
									{value.rows[0].cells?.map(
										(cell: string, cellIndex: number) => (
											<th
												key={cellIndex}
												className="text-[15px] border border-gray-300 dark:border-gray-500 px-4 py-2 text-left font-semibold text-foreground"
											>
												{cell}
											</th>
										),
									)}
								</tr>
							</thead>
							{/* Remaining rows as data */}
							<tbody>
								{value.rows.slice(1).map((row: TableRow, rowIndex: number) => (
									<tr
										key={rowIndex}
										className="hover:bg-soft-linen/80 dark:hover:bg-muted/5"
									>
										{row.cells?.map((cell: string, cellIndex: number) => (
											<td
												key={cellIndex}
												className="text-[15px] border border-gray-300 dark:border-gray-500 px-4 py-2 text-foreground"
											>
												{cell}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</>
					)}
				</table>
			</div>
		),
		faqBlock: ({ value }) => (
			<FAQAccordion title={value.title} faqs={value.faqs} />
		),
		emailSignup: () => {
			return <DigitalEbook />;
		},
	},

	list: {
		bullet: ({ children }) => (
			<ul className="my-6 !list-disc pl-8 text-foreground text-base marker:text-foreground">
				{children}
			</ul>
		),
		circle: ({ children }) => (
			<ul className="my-6 ![list-style-type:circle] pl-8 text-foreground text-base marker:text-foreground">
				{children}
			</ul>
		),
		square: ({ children }) => (
			<ul className="my-6 ![list-style-type:square] pl-8 text-foreground text-base marker:text-foreground">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="my-6 !list-decimal pl-8 text-foreground text-base marker:text-foreground">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => {
			return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
		},
		circle: ({ children }) => {
			return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
		},
		square: ({ children }) => {
			return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
		},
		number: ({ children }) => {
			return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
		},
	},

	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-foreground">{children}</strong>
		),
		code: ({ children }) => (
			<>
				<span aria-hidden>`</span>
				<code className="text-[15px]/8 font-semibold text-foreground">
					{children}
				</code>
				<span aria-hidden>`</span>
			</>
		),
		link: ({ value, children }) => {
			return (
				<Link
					href={value.href}
					className="font-medium text-link text-[#40916c] hover:text-[#236246] duration-100 ease-linear underline"
				>
					{children}
				</Link>
			);
		},
	},
};
