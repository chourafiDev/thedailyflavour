"use client";

import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";

interface Comment {
	id: string;
	content: string;
	date: string;
	author: {
		node: {
			name: string;
			avatar?: { url: string };
		};
	};
}

interface CommentsSectionProps {
	postId: number;
	postTitle: string;
	comments: Comment[];
	commentCount?: number;
	ratingAverage?: number;
	ratingCount?: number;
}

function StarRating({
	value,
	onChange,
}: {
	value: number;
	onChange?: (v: number) => void;
}) {
	const [hovered, setHovered] = useState(0);
	return (
		<div className="flex gap-0.5">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					onClick={() => onChange?.(star)}
					onMouseEnter={() => onChange && setHovered(star)}
					onMouseLeave={() => onChange && setHovered(0)}
					className={onChange ? "cursor-pointer" : "cursor-default"}
					aria-label={`${star} star${star !== 1 ? "s" : ""}`}
				>
					<Star
						size={25}
						strokeWidth={1.5}
						className={
							star <= (hovered || value)
								? "text-[#e8a000] fill-[#e8a000]"
								: "text-muted-foreground"
						}
					/>
				</button>
			))}
		</div>
	);
}

function cleanContent(html: string): string {
	return html
		.replace(/<[^>]*>/g, "")
		.replace(/&#8217;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&#8220;/g, '"')
		.replace(/&#8221;/g, '"')
		.trim();
}

export default function CommentsSection({
	postId,
	postTitle,
	comments,
	commentCount = 0,
	ratingAverage = 0,
	ratingCount = 0,
}: CommentsSectionProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email || !comment) {
			setError("Name, email and comment are required.");
			return;
		}
		setLoading(true);
		setError("");

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/comments`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						post: postId,
						author_name: name,
						author_email: email,
						content: rating ? `⭐ ${rating}/5\n\n${comment}` : comment,
					}),
				},
			);

			if (res.ok) {
				setSubmitted(true);
				setName("");
				setEmail("");
				setComment("");
				setRating(0);
			} else {
				setError("Failed to submit. Please try again.");
			}
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			className="lg:w-[90%] lg:mx-auto mb-16"
			aria-labelledby="comments-heading"
		>
			<div className="space-y-3">
				<div className="flex items-center gap-5 mb-10">
					<h2
						id="comments-heading"
						className="text-foreground font-bold text-[22px]"
					>
						{commentCount > 0
							? `${commentCount} Comment${commentCount !== 1 ? "s" : ""}`
							: "Comments"}
					</h2>

					{/* Average rating summary */}
					{ratingCount > 0 && (
						<div className="flex items-center gap-3">
							<div className="flex gap-0.5 text-[#e8a000]">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										size={18}
										fill={
											star <= Math.round(ratingAverage)
												? "currentColor"
												: "none"
										}
										strokeWidth={star <= Math.round(ratingAverage) ? 0 : 1.5}
									/>
								))}
							</div>
							<span className="text-foreground font-bold text-sm">
								{ratingAverage}/5
							</span>
							<span className="text-muted-foreground text-sm">
								based on {ratingCount}{" "}
								{ratingCount === 1 ? "review" : "reviews"}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Comment list */}
			{comments.length > 0 && (
				<ul className="space-y-6 mb-10">
					{comments.map((c) => {
						const avatarUrl = c.author.node.avatar?.url;
						const initials = c.author.node.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.toUpperCase()
							.slice(0, 2);

						const raw = cleanContent(c.content);
						const ratingMatch = raw.match(/^⭐\s*(\d)\/5\n*/);
						const displayRating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
						const displayContent = raw.replace(/^⭐\s*\d\/5\n*/, "").trim();

						return (
							<li
								key={c.id}
								className="flex gap-4 border-b border-border pb-6 last:border-0"
							>
								{/* Avatar */}
								<div className="flex-shrink-0">
									{avatarUrl &&
									!avatarUrl.includes("gravatar.com/avatar/00000") ? (
										<div className="relative w-10 h-10 rounded-full overflow-hidden">
											<Image
												src={avatarUrl}
												alt={c.author.node.name}
												fill
												className="object-cover"
												sizes="40px"
											/>
										</div>
									) : (
										<div className="w-10 h-10 rounded-full bg-[#7BAE8A] flex items-center justify-center text-white text-xs font-bold">
											{initials}
										</div>
									)}
								</div>

								{/* Content */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 flex-wrap mb-1">
										<span className="text-sm font-bold text-foreground">
											{c.author.node.name}
										</span>
										<time
											dateTime={c.date}
											className="text-xs text-muted-foreground"
										>
											{formatDistanceToNow(new Date(c.date), {
												addSuffix: true,
											})}
										</time>
									</div>

									{displayRating > 0 && (
										<div className="mb-1.5">
											<StarRating value={displayRating} />
										</div>
									)}

									<p className="text-sm text-foreground leading-relaxed">
										{displayContent}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}

			{comments.length === 0 && (
				<p className="text-muted-foreground text-sm mb-8">
					No comments yet. Be the first to share your thoughts!
				</p>
			)}

			{/* Comment form */}
			<div className="bg-soft-linen dark:bg-input/30 rounded-md p-6">
				<h3 className="text-foreground font-bold text-xl mb-2">
					Leave a Comment
				</h3>

				<p className="text-foreground text-sm mb-6">
					Your email address will not be published. Required fields are marked *
				</p>

				{submitted ? (
					<div className="flex items-center gap-3 text-[#7BAE8A]">
						<Star size={16} fill="currentColor" strokeWidth={0} />
						<p className="text-sm font-semibold">
							Thank you! Your comment is awaiting moderation.
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Rating */}
						<div>
							<label className="text-sm font-semibold text-foreground block mb-1.5">
								Rate this recipe (optional)
							</label>
							<StarRating value={rating} onChange={setRating} />
						</div>

						{/* Name + Email */}
						<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
							<div>
								<label
									htmlFor="comment-name"
									className="text-sm font-semibold text-foreground block mb-1.5"
								>
									Name <span className="text-red-500">*</span>
								</label>
								<input
									id="comment-name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Your name"
									required
									className="w-full rounded-md border border-border bg-background px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7BAE8A]"
								/>
							</div>
							<div>
								<label
									htmlFor="comment-email"
									className="text-sm font-semibold text-foreground block mb-1.5"
								>
									Email <span className="text-red-500">*</span>{" "}
									<span className="text-muted-foreground font-normal">
										(not published)
									</span>
								</label>
								<input
									id="comment-email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your@email.com"
									required
									className="w-full rounded-md border border-border bg-background px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7BAE8A]"
								/>
							</div>
						</div>

						{/* Comment */}
						<div>
							<label
								htmlFor="comment-body"
								className="text-sm font-semibold text-foreground block mb-1.5"
							>
								Comment <span className="text-red-500">*</span>
							</label>
							<textarea
								id="comment-body"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Share your thoughts about this recipe..."
								rows={4}
								required
								className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7BAE8A] resize-none"
							/>
						</div>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<Button
							type="submit"
							size={"lg"}
							shadow={"sm"}
							className="w-60"
							disabled={loading}
						>
							{loading ? (
								"Submitting..."
							) : (
								<>
									Post Comment
									<IoIosSend className="size-5" />
								</>
							)}
						</Button>
					</form>
				)}
			</div>
		</section>
	);
}
