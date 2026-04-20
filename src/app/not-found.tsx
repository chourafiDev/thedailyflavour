"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Handle search form submission
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			// Redirect to blog page with search parameter
			router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);

			// Clear search term
			setSearchTerm("");
		}
	};

	return (
		<main className="lg:mx-20 md:mx-6 mx-4 my-5 md:h-[80vh] h-[70vh] border rounded-xl p-4">
			<div className="h-full flex flex-col justify-center items-center">
				<h1 className="text-foreground font-bold md:text-[10rem] text-[6rem]">
					404
				</h1>
				<h2 className="text-foreground font-semibold md:text-5xl text-3xl mb-3">
					Page Not Found
				</h2>
				<p className="text-muted-foreground text-center mb-6">
					Look like you lost your compass... but don&apos;t worry, maybe your
					search bar can help you!
				</p>

				<form
					onSubmit={handleSearchSubmit}
					className="border border-primary md:h-14 h-auto focus:border focus:border-primary outline-none md:w-[700px] w-full bg-gray-100 flex md:flex-row flex-col items-center justify-between"
				>
					<input
						ref={searchInputRef}
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="What can we help you find..."
						className="w-full dark:text-background outline-none md:px-6 px-3 md:py-0 py-4"
					/>

					<button
						type="submit"
						disabled={!searchTerm.trim()}
						className="cursor-pointer h-full md:w-auto w-full md:px-12 px-3 md:py-0 py-4 flex gap-2 items-center justify-center bg-foreground dark:bg-background text-white disabled:cursor-not-allowed"
						aria-label="Search"
					>
						<IoSearch className="size-4" /> Search
					</button>
				</form>

				<p className="text-foreground text-lg mt-4">Or</p>

				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "link", size: "lg" }),
						"text-base",
					)}
				>
					Return Home
				</Link>
			</div>
		</main>
	);
}
