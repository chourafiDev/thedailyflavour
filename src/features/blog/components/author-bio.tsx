import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { DummyAuthor } from "@/lib/dummy-data";

// Remi's short bio shown under each recipe post
const REMI_SHORT_BIO = [
	"Hi, I'm Remi — the home cook behind The Daily Flavour. I'm obsessed with bringing the world's best flavours to the family table in 30 minutes or less.",
	"From Thai street food to Lebanese home cooking, I spend my time figuring out how to get incredible results with a regular supermarket shop and a weeknight schedule.",
];

interface AuthorBioProps {
	author: DummyAuthor;
}

const AuthorBio = ({ author }: AuthorBioProps) => {
	if (!author) return null;

	const authorName = author.name || "Remi";
	const authorSlug = author.slug || "remi";
	const authorImage =
		"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80";

	const getInitials = (name: string) =>
		name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);

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
						<AvatarImage
							src={authorImage}
							alt={authorName}
							className="object-cover"
							itemProp="image"
						/>
						<AvatarFallback>{getInitials(authorName)}</AvatarFallback>
					</Avatar>

					<h3 className="text-foreground font-bold text-center text-base">
						<Link href={`/author/${authorSlug}`} itemProp="url">
							<span itemProp="name">{authorName}</span>
						</Link>
					</h3>
				</div>

				<div className="flex-1">
					<div
						itemProp="description"
						className="text-muted-foreground text-sm prose prose-sm max-w-none"
					>
						{REMI_SHORT_BIO.map((paragraph, i) => (
							<p
								key={i}
								className="my-2 text-foreground text-base leading-7 first:mt-0 last:mb-0"
							>
								{paragraph}
							</p>
						))}
						<p className="mt-2">
							<Link
								href={`/author/${authorSlug}`}
								className="font-medium text-link underline"
							>
								Read Full bio
							</Link>
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default AuthorBio;
