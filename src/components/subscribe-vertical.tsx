"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { z } from "zod";
import { addWelcomeSubscriber } from "@/app/_actions/welcome-email";
/* import { addWelcomeSubscriber } from "@/app/_actions/welcome-email"; */
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.trim()
		.toLowerCase(),
});

const SubscribeVertical = () => {
	const [message, setMessage] = useState<string>("");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	// Auto-dismiss message after 5 seconds with fade-out
	useEffect(() => {
		if (message) {
			setIsVisible(true);

			// Start fade-out after 4.5 seconds
			const fadeTimer = setTimeout(() => {
				setIsVisible(false);
			}, 4500);

			// Remove message after 5 seconds
			const removeTimer = setTimeout(() => {
				setMessage("");
			}, 5000);

			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(removeTimer);
			};
		}
	}, [message]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			setMessage("");
			setIsSuccess(false);

			const result = await addWelcomeSubscriber({ email: values.email });

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

	return (
		<section className="min-h-auto w-full bg-soft-linen rounded-xl overflow-hidden relative">
			<div className="relative px-5 py-8">
				<div>
					<div className="mb-8">
						<h4 className="font-playfair-display text-center text-foreground font-semibold text-xl mb-1">
							Subscribe Newsletter
						</h4>
						<p className="text-foreground/70 text-center text-sm font-medium">
							Sign up for free and be the first to get notified about new posts.
						</p>
					</div>

					<div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className="flex items-center gap-3 mb-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Email Address *</FormLabel>
												<FormControl>
													<Input
														type="email"
														disabled={isPending}
														className="w-full py-3.5 rounded-full dark:bg-white"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<Button
									type="submit"
									size={"lg"}
									shadow={"bold"}
									className="py-[22px] w-full"
									disabled={isPending}
								>
									{isPending ? (
										"Sending..."
									) : (
										<>
											<IoIosSend className="size-5" />
											Subscribe
										</>
									)}
								</Button>
							</form>
						</Form>
					</div>

					<p className="text-foreground text-xs text-center mt-4">
						We won&apos;t send you spam. Unsubscribe at any time.
					</p>

					{/* Success/Error Messages with Fade Animation */}
					{message && (
						<div
							className={`mt-3 text-sm p-3 rounded-lg flex items-start gap-2 transition-opacity duration-500 ${
								isVisible ? "opacity-100" : "opacity-0"
							} ${
								isSuccess
									? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
									: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
							}`}
							role={isSuccess ? "status" : "alert"}
							aria-live="polite"
						>
							{isSuccess ? (
								<CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
							) : (
								<XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
							)}
							<p className="lg:text-start text-center flex-1">{message}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default SubscribeVertical;
