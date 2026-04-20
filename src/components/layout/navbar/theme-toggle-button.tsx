"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Skiper = () => {
	const [scale, setScale] = useState(0);
	const [gap, setGap] = useState(0);
	const [flexDirection, setFlexDirection] = useState("row");

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-5">
			<motion.div
				className="relative flex items-center justify-center gap-1"
				animate={{
					gap: gap ? `${gap}px` : "4px",
					scale: scale ? `${scale / 20}` : "1",
				}}
				style={{
					flexDirection: flexDirection === "column" ? "column" : "row",
				}}
				transition={{ duration: 0.35 }}
			>
				<motion.div layout>
					<ThemeToggleButton className={cn("size-10 p-2")} />
				</motion.div>
			</motion.div>
		</div>
	);
};

export { Skiper };

export const ThemeToggleButton = ({
	className = "",
}: {
	className?: string;
}) => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const isDark = theme === "dark";

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleToggle = () => {
		setTheme(isDark ? "light" : "dark");
	};

	// Prevent flash of unstyled content
	if (!mounted) {
		return (
			<button
				type="button"
				className={cn(
					"rounded-full border transition-all duration-300 active:scale-95",
					"bg-background text-foreground",
					className,
				)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					fill="currentColor"
					strokeLinecap="round"
					viewBox="0 0 32 32"
				>
					<circle cx="16" cy="16" r="8" />
				</svg>
			</button>
		);
	}

	return (
		<button
			type="button"
			className={cn(
				"rounded-full border transition-all duration-300 active:scale-95",
				isDark ? "bg-foreground text-background" : "bg-background text-primary",
				className,
			)}
			onClick={handleToggle}
			aria-label="Toggle dark mode"
			title="Toggle dark mode"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				fill="currentColor"
				strokeLinecap="round"
				viewBox="0 0 32 32"
			>
				<clipPath id="skiper-btn-2">
					<motion.path
						animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
					/>
				</clipPath>
				<g clipPath="url(#skiper-btn-2)">
					<motion.circle
						animate={{ r: isDark ? 10 : 8 }}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						cx="16"
						cy="16"
					/>
					<motion.g
						animate={{
							rotate: isDark ? -100 : 0,
							scale: isDark ? 0.5 : 1,
							opacity: isDark ? 0 : 1,
						}}
						transition={{ ease: "easeInOut", duration: 0.35 }}
						stroke="currentColor"
						strokeWidth="1.5"
					>
						<path d="M16 5.5v-4" />
						<path d="M16 30.5v-4" />
						<path d="M1.5 16h4" />
						<path d="M26.5 16h4" />
						<path d="m23.4 8.6 2.8-2.8" />
						<path d="m5.7 26.3 2.9-2.9" />
						<path d="m5.8 5.8 2.8 2.8" />
						<path d="m23.4 23.4 2.9 2.9" />
					</motion.g>
				</g>
			</svg>
		</button>
	);
};
