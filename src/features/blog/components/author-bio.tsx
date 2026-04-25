import Image from "next/image";
import Link from "next/link";

interface AuthorBioProps {
	author: { name: string; slug: string; image?: string };
}

const AuthorBio = ({ author }: AuthorBioProps) => {
	if (!author) return null;

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
				className="flex md:flex-row flex-col items-center lg:gap-14 md:gap-10 gap-5"
			>
				<div>
					{author.image ? (
						<figure
							itemProp="image"
							itemScope
							itemType="https://schema.org/ImageObject"
							className="relative rounded-full size-[100px] mb-5 mx-auto overflow-hidden"
						>
							<Image
								src={author.image}
								alt={`${author.name} profile picture`}
								itemProp="url"
								priority
								fill
								sizes="100px"
								className="absolute object-cover"
							/>
						</figure>
					) : (
						<div className="size-[120px] rounded-full bg-muted flex items-center justify-center mb-5 mx-auto">
							<span className="text-2xl font-bold text-muted-foreground">
								{getInitials(author.name)}
							</span>
						</div>
					)}

					<h3 className="text-foreground font-bold text-center text-base">
						<Link href={`/author/${author.slug}`} itemProp="url">
							<span itemProp="name">{author.name}</span>
						</Link>
					</h3>
				</div>

				<div className="flex-1">
					<div
						itemProp="description"
						className="text-muted-foreground text-sm prose prose-sm max-w-none"
					>
						<p className="my-2 text-foreground text-base leading-7 first:mt-0 last:mb-0">
							Mom of two, comfort food lover, and the heart behind The Daily
							Flavour. I share real recipes from my real kitchen warm, simple,
							and always worth making twice. Grab a recipe and make yourself at
							home. 🍲
						</p>
						<p className="mt-2">
							<Link
								href={`/author/${author.slug}`}
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
