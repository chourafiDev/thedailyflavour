"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { darkLogo, whiteLogo } from "@/lib/assets";

const Info = () => {
	const { theme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// Determine the current theme, accounting for system preference
	const currentTheme = theme === "system" ? systemTheme : theme;
	const logoSrc = currentTheme === "light" ? darkLogo : whiteLogo;

	// Render a placeholder during SSR to avoid hydration issues
	if (!mounted) {
		return (
			<Link href="/" className="inline-block translate-y-1">
				<div className="h-[28px] w-[190px]" />
			</Link>
		);
	}

	return (
		<div className="md:p-12 p-8 flex-1">
			<Link
				href="/"
				className="inline-block translate-y-1"
				aria-label="Go to homepage"
			>
				<Image
					src={logoSrc}
					alt="Company logo"
					width={190}
					height={28}
					priority
					className="h-auto w-[190px]"
				/>
			</Link>

			<p className="text-sm text-muted-foreground mt-6">
				Empowering solo female travelers to explore the world with confidence.
				We share authentic travel experiences, practical safety tips, and
				budget-friendly advice to help you plan your next adventure. Join our
				community of fearless women travelers.
			</p>
		</div>
	);
};

export default Info;
