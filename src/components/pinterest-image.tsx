import Image from "next/image";
import { FaPinterest } from "react-icons/fa";

interface PinterestImageProps {
	src: string;
	alt: string;
	pageUrl: string;
	width?: number;
	height?: number;
	priority?: boolean;
	className?: string;
	itemProp?: string;
	wrapperClassName?: string;
}

export function PinterestImage({
	src,
	alt,
	pageUrl,
	width,
	height,
	priority,
	className,
	itemProp,
	wrapperClassName = "",
}: PinterestImageProps) {
	const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(src)}&description=${encodeURIComponent(alt)}`;

	return (
		<div className={`relative group ${wrapperClassName}`}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				className={className}
				itemProp={itemProp}
			/>

			<a
				href={pinterestUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`Save "${alt}" to Pinterest`}
				className="
          absolute top-3 right-3 z-30
          flex items-center gap-1.5
          bg-[#E60023] text-white
          text-sm font-bold px-5 py-2.5 rounded-full shadow-lg
          opacity-0 translate-y-1 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
          transition-all duration-200
        "
			>
				<FaPinterest className="size-4 shrink-0" aria-hidden="true" />
				Save On Pinterest
			</a>
		</div>
	);
}
