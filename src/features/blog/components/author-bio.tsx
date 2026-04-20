import Link from "next/link";
import { PortableText } from "next-sanity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { POST_QUERYResult } from "@/sanity/types";

interface AuthorBioProps {
	author: NonNullable<POST_QUERYResult>["author"];
}

const AuthorBio = ({ author }: AuthorBioProps) => {
	if (!author) return null;

	// ✅ Safe data extraction
	const authorName = author.name || "Anonymous";
	const authorSlug = author.slug || "#";
	const authorImage = author.image?.asset?.url;
	const authorBio = author.bio?.slice(0, 2);

	// ✅ Get initials for avatar fallback
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<aside
			aria-labelledby="author-heading"
			className="lg:w-[80%] mx-auto mb-10"
		>
			<h2
				id="author-heading"
				className="text-foreground font-bold text-[22px] mb-5"
			>
				About The Author
			</h2>
			<div
				itemScope
				itemType="https://schema.org/Person"
				className="flex md:flex-row flex-col items-start lg:gap-14 md:gap-10 gap-5"
			>
				<div>
					<Avatar className="size-20 mx-auto mb-2.5">
						{authorImage && (
							<AvatarImage
								src={authorImage}
								alt={authorName}
								className="object-cover"
								itemProp="image"
							/>
						)}
						<AvatarFallback>{getInitials(authorName)}</AvatarFallback>
					</Avatar>

					<h3 className="text-foreground font-bold text-center text-base">
						<Link href={`/author/${authorSlug}`} itemProp="url">
							<span itemProp="name">{authorName}</span>
						</Link>
					</h3>
				</div>

				<div className="flex-1">
					{authorBio && authorBio.length > 0 ? (
						<div
							itemProp="description"
							className="text-muted-foreground text-sm prose prose-sm max-w-none"
						>
							<PortableText
								value={authorBio}
								components={{
									block: {
										normal: ({ children }) => (
											<p className="my-2 text-foreground text-base leading-7 first:mt-0 last:mb-0">
												{children}
											</p>
										),
									},
								}}
							/>
							<p className="mt-2">
								<Link
									href={`/author/${authorSlug}`}
									className="font-medium text-link underline"
								>
									Read Full bio
								</Link>
							</p>
						</div>
					) : (
						<p itemProp="description" className="text-muted-foreground text-sm">
							Travel writer and blogger sharing authentic experiences.
						</p>
					)}
				</div>
			</div>
		</aside>
	);
};

export default AuthorBio;
