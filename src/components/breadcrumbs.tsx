import Link from "next/link";
import { IoChevronForwardOutline } from "react-icons/io5";

const Breadcrumbs = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<nav aria-label="Breadcrumb" className="bg-soft-linen py-3 border-b">
			<div className="custom-container">
				<ol
					itemScope
					itemType="https://schema.org/BreadcrumbList"
					className="flex flex-wrap items-center gap-1.5 font-medium text-foreground text-xs"
				>
					<li
						itemProp="itemListElement"
						itemScope
						itemType="https://schema.org/ListItem"
					>
						<Link href="/" className="font-bold" itemProp="item">
							<span itemProp="name">Home</span>
						</Link>
						<meta itemProp="position" content="1" />
					</li>
					<li>
						<IoChevronForwardOutline className="size-3.5" aria-hidden="true" />
					</li>
					{children}
				</ol>
			</div>
		</nav>
	);
};

export default Breadcrumbs;
