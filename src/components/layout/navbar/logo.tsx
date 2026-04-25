"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { darkLogo, whiteLogo } from "@/lib/assets";

const Logo = () => {
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
		<Link
			href="/"
			className="inline-block translate-y-1"
			aria-label="Go to homepage"
		>
			<Image
				src={logoSrc}
				alt="Company logo"
				width={220}
				height={40}
				priority
				className="h-auto md:w-[220px] w-[150px]"
			/>
		</Link>
	);
};

export default Logo;
