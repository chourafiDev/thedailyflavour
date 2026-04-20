"use client";

import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { Button } from "./ui/button";

export default function GoToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when scrolled down
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	// Scroll to top
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{isVisible && (
				<Button
					onClick={scrollToTop}
					size={"icon"}
					shadow={"soft"}
					className="size-10 fixed bottom-6 right-6 rounded-full"
					aria-label="Scroll to top"
				>
					<IoArrowUp size={20} aria-hidden="true" />
				</Button>
			)}
		</>
	);
}
