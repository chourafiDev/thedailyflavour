"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import z from "zod";
import { addWelcomeSubscriber } from "@/app/_actions/welcome-email";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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

const Subscribe = () => {
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
		<section
			aria-labelledby="subscribe-heading"
			className="section-bottom rounded-md md:px-10 px-4 md:py-12 py-8 bg-soft-linen"
		>
			<div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-6">
				<h2
					id="subscribe-heading"
					className="title lg:text-start text-center flex-1"
				>
					Subscribe Now To Stay Updated With Top News!
				</h2>
				<p className="text-muted-foreground lg:text-start text-center text-sm flex-1">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
					voluptatem nobis minus accusantium voluptas.
				</p>

				<div className="flex-1 w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex items-center bg-background rounded-full overflow-hidden p-1.5 border"
							aria-label="Newsletter subscription form"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												placeholder="Enter your email"
												type="email"
												aria-label="Email address"
												disabled={isPending}
												className="w-full bg-background dark:bg-transparent border-none shadow-none outline-none dark:focus-visible:ring-offset-0 focus-visible:ring-0"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								variant="default"
								size="icon"
								shadow="soft"
								className="size-12 mr-1 mb-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
								aria-label="Subscribe to newsletter"
								disabled={isPending}
							>
								<IoIosSend className="size-7" aria-hidden="true" />
							</Button>
						</form>

						{/* Form Validation Error */}
						{form.formState.errors.email && (
							<p className="text-xs text-destructive pl-4 mt-2" role="alert">
								{form.formState.errors.email.message}
							</p>
						)}
					</Form>

					{/* Privacy Notice */}
					<p className="text-muted-foreground lg:text-start text-center text-xs mt-2">
						We won&apos;t send you spam. Unsubscribe at any time.
					</p>
				</div>
			</div>

			{/* Success/Error Messages with Fade Animation */}
			{message && (
				<div
					className={`mt-3 text-sm p-3 rounded-md flex items-start gap-2 transition-opacity duration-500 ${
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
		</section>
	);
};

export default Subscribe;
