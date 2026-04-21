import Link from "next/link";
import Categories from "./categories";
import Info from "./info";
import QuickLink from "./quick-link";
import Subscribe from "./subscribe";

const index = () => {
	return (
		<footer className="custom-container mb-4">
			<div className="border rounded-md overflow-hidden">
				<div className="grid lg:grid-cols-3 grid-cols-1">
					<Info />

					<div className="flex-1 flex justify-between md:p-12 p-8 lg:border-r lg:border-l border-b border-t lg:border-b-0 lg:border-t-0 gap-6">
						<QuickLink />
						<Categories />
					</div>

					<Subscribe />
				</div>

				<div className="bg-primary dark:bg-soft-linen flex lg:flex-row flex-col lg:gap-0 gap-5 items-center justify-between py-3 md:px-12 px-8">
					<p className="text-foreground font-semibold text-[13px]">
						&copy; {new Date().getFullYear()} Brand, All Rights Reserved.
					</p>

					<div className="flex md:flex-row flex-col items-center md:gap-4 gap-2">
						<Link
							href="/terms"
							className="font-semibold text-foreground text-[13px] link"
						>
							Term Of Services
						</Link>
						<div className="md:block hidden h-3 w-[1px] bg-foreground/30" />
						<Link
							href="/privacy-policy"
							className="font-semibold text-[13px] text-foreground link"
						>
							Privacy Policy
						</Link>
						<div className="md:block hidden h-3 w-[1px] bg-foreground/30" />
						<Link
							href="/disclaimer"
							className="font-semibold text-foreground text-[13px] link"
						>
							Disclaimer
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default index;
