"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import z from "zod";
import { addDigitalEbookSubscriber } from "@/app/_actions/digital-ebook-email";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { digitalEbook } from "@/lib/assets";
/* import { ebook } from "@/lib/assets"; */
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const subscribeSchema = z.object({
	email: z
		.email("Please enter a valid email address")
		.min(1, "Email is required"),
});

const DigitalEbook = () => {
	const [message, setMessage] = useState<string | undefined>("");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof subscribeSchema>>({
		resolver: zodResolver(subscribeSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof subscribeSchema>) {
		startTransition(async () => {
			setMessage("");
			setIsSuccess(false);

			const result = await addDigitalEbookSubscriber({ email: values.email });

			if (result.success) {
				setMessage(result.message);
				setIsSuccess(true);
				form.reset();
			} else {
				setMessage(result.error);
				setIsSuccess(false);
			}
		});
	}

	const handleClear = () => {
		setIsSuccess(false);
		setMessage("");
	};

	return (
		<section className="flex flex-col md:flex-row items-center justify-between gap-6 bg-foreground border border-primary rounded-xl shadow-lg shadow-black/5 px-6 md:px-8 py-10">
			{/* Planner Image */}
			<div className="w-auto bg-gray-100 rounded-xl overflow-hidden">
				<Image
					src={digitalEbook}
					alt="Plan Your 2026 Southeast Asia Adventures with Confidence"
					width={512}
					height={800}
					className="h-[380px] w-[250px] shadow-lg object-cover shadow-black/10"
				/>
			</div>

			{/* Text + Form */}
			<div className="flex-1">
				<h2 className="lg:text-3xl text-2xl text-background font-bold mb-4">
					Plan Your 2026 Southeast Asia Adventures with Confidence ✈️
				</h2>
				<p className="text-muted mb-4">
					Get my{" "}
					<span className="font-semibold">
						FREE 52-page Travel Planner Bundle
					</span>{" "}
					— the exact system I use to organize stress-free solo trips across
					Southeast Asia. Track budgets, create daily itineraries, manage
					accommodations, and journal your memories all in one beautiful PDF.
				</p>

				<ul className="text-muted mb-6 space-y-2">
					<li className="flex items-start">
						<span className="mr-2">✓</span>
						<span>Full 2026 calendar + monthly trip planning pages</span>
					</li>
					<li className="flex items-start">
						<span className="mr-2">✓</span>
						<span>
							Budget trackers & expense sheets (perfect for SEA pricing)
						</span>
					</li>
					<li className="flex items-start">
						<span className="mr-2">✓</span>
						<span>
							Daily itinerary planners, packing lists & safety checklists
						</span>
					</li>
					<li className="flex items-start">
						<span className="mr-2">✓</span>
						<span>Travel journal pages to capture every incredible moment</span>
					</li>
				</ul>

				{isSuccess ? (
					<div className="p-4 bg-green-100 border border-green-400 rounded-lg flex items-center justify-between">
						<p className="text-green-700 font-medium flex-1">{message}</p>
						<button
							type="button"
							onClick={handleClear}
							className="size-7 cursor-pointer flex items-center justify-center rounded-full bg-white"
						>
							<IoClose className="text-gray-900" />
							<span className="sr-only">Close</span>
						</button>
					</div>
				) : (
					<>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex lg:flex-row flex-col gap-4"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input
													type="email"
													placeholder="Enter your email to get instant access"
													className="flex-1 focus-visible:border-white rounded-full px-6"
													disabled={isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									size={"lg"}
									variant={"white"}
									className="py-6 whitespace-nowrap 
												hover:animate-none hover:scale-110 active:scale-95
												transition-all duration-300 
												hover:shadow-2xl
												relative overflow-hidden
												font-semibold"
									disabled={isPending}
								>
									{isPending ? "Sending..." : "Get My Free Planner 🎁"}
								</Button>
							</form>
						</Form>

						{message && !isSuccess && (
							<p className="text-red-600 text-sm mt-2">{message}</p>
						)}
					</>
				)}

				<p className="text-sm text-gray-500 mt-3">
					🔒 Your email is safe with me. No spam, just travel tips + occasional
					freebies. Unsubscribe anytime.
				</p>
			</div>
		</section>
	);
};

export default DigitalEbook;

<style jsx global>{`
  @keyframes vibrateStrong {
    0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
    10% { transform: translateX(-3px) translateY(-3px) rotate(-1deg); }
    20% { transform: translateX(3px) translateY(3px) rotate(1deg); }
    30% { transform: translateX(-3px) translateY(3px) rotate(-1deg); }
    40% { transform: translateX(3px) translateY(-3px) rotate(1deg); }
    50% { transform: translateX(-3px) translateY(-3px) rotate(-1deg); }
    60% { transform: translateX(3px) translateY(3px) rotate(1deg); }
    70% { transform: translateX(-3px) translateY(3px) rotate(-1deg); }
    80% { transform: translateX(3px) translateY(-3px) rotate(1deg); }
    90% { transform: translateX(-3px) translateY(-3px) rotate(-1deg); }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
                  0 0 10px rgba(255, 255, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                  0 0 30px rgba(255, 255, 255, 0.5);
    }
  }

  .vibrate-glow {
    animation: vibrateStrong 0.4s ease-in-out infinite,
               glow 1.5s ease-in-out infinite;
  }

  .vibrate-glow:hover {
    animation: none;
  }
`}</style>;
