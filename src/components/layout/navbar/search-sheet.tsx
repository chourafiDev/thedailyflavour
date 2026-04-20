"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Trending from "@/features/search/components/trending";
import { dummyCategories, dummyTrendingPosts } from "@/lib/dummy-data";
import { Button } from "../../ui/button";

interface Category {
	title: string;
	slug: string;
}

const formSchema = z.object({
	search: z.string().trim(),
	category: z.string().optional(),
});

const SearchSheet = () => {
	const id = useId();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const searchParams = useSearchParams();

	const query = searchParams.get("q") || "";
	const category = searchParams.get("category") || "";

	// ── Dummy data (replace with WPGraphQL fetch once WordPress is live) ──
	const categories: Category[] = dummyCategories.map((cat) => ({
		title: cat.title,
		slug: cat.slug,
	}));

	const trendingPosts = dummyTrendingPosts;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: query,
			category: category,
		},
	});

	// Update form when URL params change
	useEffect(() => {
		form.reset({
			search: query,
			category: category,
		});
	}, [query, category, form]);

	const performSearch = (values: z.infer<typeof formSchema>) => {
		const params = new URLSearchParams();

		if (values.search) {
			params.set("q", values.search);
		}

		if (values.category) {
			params.set("category", values.category);
		}

		if (params.toString()) {
			router.push(`/search?${params.toString()}`);
			setOpen(false);
		}
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			performSearch(values);
		} catch (error) {
			console.error("Form submission error", error);
		}
	}

	const handleCategoryChange = (categoryValue: string) => {
		const currentSearch = form.getValues("search");
		form.setValue("category", categoryValue);

		performSearch({
			search: currentSearch,
			category: categoryValue,
		});
	};

	const handleClearCategory = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		form.setValue("category", "");
	};

	const selectedCategory = form.watch("category");

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="size-10 flex"
					data-slot="sheet-trigger"
					data-search-toggle="true"
					type="button"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-label="Open search dialog"
					title="Search"
				>
					<IoSearch className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent side="top" className="gap-0 overflow-y-auto max-h-screen">
				<div className="py-6 lg:px-20 md:px-10 px-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Search Input Section */}
							<div>
								<h3 className="text-foreground font-extrabold text-[17px] mb-2">
									What Are You Looking For?
								</h3>
								<div className="flex items-center bg-background dark:bg-input/30 overflow-hidden rounded-full p-1 border">
									<FormField
										control={form.control}
										name="search"
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormControl>
													<Input
														placeholder="Search recipes..."
														type="text"
														aria-label="Search query"
														className="w-full bg-background dark:bg-transparent border-none shadow-none outline-none dark:focus-visible:ring-offset-0 focus-visible:border-none focus-visible:ring-0"
														{...field}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																e.preventDefault();
																form.handleSubmit(onSubmit)();
															}
														}}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<Button
										type="submit"
										shadow={"sm"}
										className="has-[>svg]:px-10 py-6 mb-1 mr-1 flex-shrink-0"
									>
										Search <IoSearch />
									</Button>
								</div>
							</div>

							{/* Category Filter Section */}
							<div>
								<div className="flex items-center justify-between mb-2">
									<h3 className="text-foreground font-extrabold text-[17px]">
										Popular Searches:
									</h3>
									{selectedCategory && (
										<button
											type="button"
											onClick={handleClearCategory}
											className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
										>
											<X className="size-3" />
											Clear filter
										</button>
									)}
								</div>

								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<RadioGroup
													onValueChange={handleCategoryChange}
													value={field.value}
													className="flex flex-wrap gap-2"
												>
													{categories.map((item) => (
														<Label
															key={`${id}-${item.slug}`}
															htmlFor={`${id}-${item.slug}`}
															className="relative flex cursor-pointer items-center gap-3 rounded-full border border-input dark:bg-input/30 px-5 py-2.5 text-center dark:hover:bg-white hover:bg-primary hover:text-background transition-colors outline-none has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[:checked]:text-background dark:has-[:checked]:bg-white has-[:checked]:bg-foreground"
														>
															<RadioGroupItem
																id={`${id}-${item.slug}`}
																value={item.slug}
																className="sr-only after:absolute after:inset-0"
															/>
															<p className="text-sm leading-none font-medium whitespace-nowrap">
																{item.title}
															</p>
														</Label>
													))}
												</RadioGroup>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</form>
					</Form>

					<div className="my-6">
						<Separator />
					</div>

					<div>
						<h3 className="text-foreground font-extrabold text-[17px] mb-2">
							Trending Now
						</h3>
						<Trending posts={trendingPosts} loading={false} />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SearchSheet;
