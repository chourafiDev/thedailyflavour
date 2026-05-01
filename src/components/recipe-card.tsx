"use client";

import { Check, Clock, DollarSign, Flame, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ParsedIngredient, ParsedInstruction } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import PrintRecipeButton from "./print-recipe-button";

export interface RecipeCardProps {
	title: string;
	description?: string;
	featuredImageUrl?: string | null;
	featuredImageAlt?: string | null;
	prepTime?: number | null;
	servings?: number | null;
	cookTime?: number | null;
	totalTime?: number | null;
	calories?: number | null;
	cost?: number | null;
	ingredientsRaw?: string | null;
	instructionsRaw?: string | null;
	notes?: string | null;
	nutrition?: string | null;
	author?: string;
	printUrl?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseIngredients(raw: string): ParsedIngredient[] {
	return raw
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean)
		.map((line) => {
			if (line.startsWith("##")) {
				return { name: line.replace(/^##\s*/, ""), group: "header" as const };
			}
			const match = line.match(
				/^([\d\s\u00BC-\u00BE\u2150-\u215E/.]+)?\s*(tsp|tbsp|cup|cups|oz|lb|g|kg|ml|l|litre|liter|pinch|dash|handful|clove|cloves|slice|slices|can|cans|package|packages|pkg|bunch|bunches|sprig|sprigs|head|heads|stalk|stalks|piece|pieces|sheet|sheets|strip|strips)?\s*(.+)$/i,
			);
			if (match) {
				const [, amount, unit, rest] = match;
				const commaSplit = rest.split(",");
				return {
					amount: amount?.trim() || undefined,
					unit: unit?.trim() || undefined,
					name: commaSplit[0].trim(),
					notes: commaSplit.slice(1).join(",").trim() || undefined,
				};
			}
			return { name: line };
		});
}

function parseInstructions(raw: string): ParsedInstruction[] {
	let stepNum = 0;
	return raw
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean)
		.map((line) => {
			if (line.startsWith("##")) {
				return {
					step: 0,
					text: line.replace(/^##\s*/, ""),
					group: "header" as const,
				};
			}
			stepNum++;
			const clean = line.replace(/^(step\s*)?\d+[.:)]\s*/i, "").trim();
			return { step: stepNum, text: clean };
		});
}

function scaleAmount(amount: string, scale: number): string {
	if (scale === 1) return amount;
	const unicodeFracs: Record<string, number> = {
		"¼": 0.25,
		"½": 0.5,
		"¾": 0.75,
		"⅓": 1 / 3,
		"⅔": 2 / 3,
		"⅛": 0.125,
		"⅜": 0.375,
		"⅝": 0.625,
		"⅞": 0.875,
	};
	let normalised = amount;
	for (const [char, val] of Object.entries(unicodeFracs)) {
		normalised = normalised.replace(char, ` ${val}`);
	}
	const parts = normalised.trim().split(/\s+/);
	const num = parts.reduce((acc, p) => {
		const frac = p.split("/");
		if (frac.length === 2) return acc + parseInt(frac[0]) / parseInt(frac[1]);
		const n = parseFloat(p);
		return isNaN(n) ? acc : acc + n;
	}, 0);
	const scaled = num * scale;
	if (scaled === 0) return amount;
	const fracs: [number, string][] = [
		[0.125, "⅛"],
		[0.25, "¼"],
		[0.333, "⅓"],
		[0.375, "⅜"],
		[0.5, "½"],
		[0.625, "⅝"],
		[0.667, "⅔"],
		[0.75, "¾"],
		[0.875, "⅞"],
	];
	const whole = Math.floor(scaled);
	const decimal = scaled - whole;
	const frac = fracs.find(([f]) => Math.abs(decimal - f) < 0.04);
	if (frac) return whole > 0 ? `${whole} ${frac[1]}` : frac[1];
	if (Number.isInteger(scaled)) return String(scaled);
	return parseFloat(scaled.toFixed(2)).toString();
}

// ─── NutritionGrid ────────────────────────────────────────────────────────────
function NutritionGrid({ raw }: { raw: string }) {
	const items = raw
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean)
		.map((line) => {
			const colonIdx = line.indexOf(":");
			if (colonIdx === -1) return null;
			return {
				key: line.slice(0, colonIdx).trim(),
				val: line.slice(colonIdx + 1).trim(),
			};
		})
		.filter(Boolean) as { key: string; val: string }[];

	if (items.length === 0) {
		return (
			<div className="pb-4 text-sm leading-[1.7] text-foreground whitespace-pre-line">
				{raw}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-2 pt-3 pb-3">
			{items.map((item, i) => (
				<div
					key={i}
					className="bg-[#7bae8a1f] rounded px-3 py-2 flex flex-col gap-0.5"
				>
					<span className="text-[0.63rem] uppercase tracking-[0.07em] text-foreground/70 font-[Arial,sans-serif]">
						{item.key}
					</span>
					<span className="text-[0.9rem] font-bold text-foreground font-[Arial,sans-serif]">
						{item.val}
					</span>
				</div>
			))}
		</div>
	);
}

// ─── StatPill ─────────────────────────────────────────────────────────────────
function StatPill({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-2 px-5 py-3 border-r border-[#eae5d8] flex-[1_1_120px] last:border-r-0">
			<span className="text-[#7BAE8A] flex">{icon}</span>
			<div>
				<p className="text-[0.62rem] uppercase tracking-[0.07em] text-foreground font-[Arial,sans-serif] mb-1 leading-none">
					{label}
				</p>
				<p className="text-[0.88rem] font-bold text-foreground font-[Arial,sans-serif] leading-none">
					{value}
				</p>
			</div>
		</div>
	);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RecipeCard({
	title,
	description,
	featuredImageUrl,
	featuredImageAlt,
	prepTime,
	servings: initialServings,
	cookTime,
	totalTime,
	calories,
	cost,
	ingredientsRaw,
	instructionsRaw,
	notes,
	nutrition,
	author = "Sarah Mitchell",
}: RecipeCardProps) {
	const ingredients = ingredientsRaw ? parseIngredients(ingredientsRaw) : [];
	const instructions = instructionsRaw
		? parseInstructions(instructionsRaw)
		: [];

	const BASE_SERVINGS = initialServings ?? 4;
	const [servings, setServings] = useState(BASE_SERVINGS);
	const scale = servings / BASE_SERVINGS;

	const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(
		new Set(),
	);
	const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

	const toggleIngredient = (i: number) =>
		setCheckedIngredients((prev) => {
			const s = new Set(prev);
			s.has(i) ? s.delete(i) : s.add(i);
			return s;
		});
	const toggleStep = (i: number) =>
		setCheckedSteps((prev) => {
			const s = new Set(prev);
			s.has(i) ? s.delete(i) : s.add(i);
			return s;
		});

	const hasBody = ingredients.length > 0 || instructions.length > 0;

	return (
		<>
			{/* Minimal style block — only for things Tailwind cannot do */}
			<style>{`
				/* Section title divider line */
				/* Ingredient bullet */
				.rc-ingredient-bullet::before {
					content: '';
					position: absolute;
					left: 0;
					top: 0.55em;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: #7BAE8A;
				}
				/* Print */
				@media print {
					.rc-scaler { display: none !important; }
					.recipe-card { box-shadow: none !important; border: 1px solid #ccc !important; }
					.rc-collapsible-body { display: block !important; }
				}
			`}</style>

			{/* ── Card wrapper ── */}
			<div
				id="recipe-card"
				className="recipe-card border-2 border-black dark:border-white rounded-md bg-[#fffef9] dark:bg-soft-linen my-8 shadow-[5px_5px_0_#000] overflow-hidden scroll-mt-[100px]"
			>
				{/* ── Header ── */}
				<div className="bg-[#7BAE8A] text-[#fffef9] px-6 py-[1.1rem] flex md:flex-row flex-col items-center justify-between md:gap-4 gap-3">
					<h2 className="text-[1.4rem] font-bold tracking-[-0.02em] leading-tight">
						{title}
					</h2>
					<PrintRecipeButton />
				</div>

				{/* ── Description + Featured Image ── */}
				{(description || featuredImageUrl) && (
					<div
						className={`border-b border-[#eae5d8] grid gap-6 p-4 ${featuredImageUrl ? "grid-cols-[220px_1fr]" : "grid-cols-1"} max-sm:grid-cols-1`}
					>
						{featuredImageUrl && (
							<div className="relative rounded-md overflow-hidden aspect-square flex-shrink-0">
								<Image
									src={featuredImageUrl}
									alt={featuredImageAlt || title}
									fill
									style={{ objectFit: "cover" }}
								/>
							</div>
						)}
						{description && (
							<p className="py-4 text-[0.92rem] leading-[1.65] text-foreground m-0 self-center">
								{description}
							</p>
						)}
					</div>
				)}

				{/* ── Stats bar ── */}
				<div className="flex flex-wrap border-b border-[#eae5d8]">
					{prepTime != null && (
						<StatPill
							icon={<Clock size={15} />}
							label="Prep Time"
							value={formatTime(prepTime)}
						/>
					)}
					{cookTime != null && (
						<StatPill
							icon={<Flame size={15} />}
							label="Cook Time"
							value={formatTime(cookTime)}
						/>
					)}
					{(totalTime ?? (prepTime && cookTime ? prepTime + cookTime : null)) !=
						null && (
						<StatPill
							icon={<Clock size={15} />}
							label="Total Time"
							value={formatTime(
								totalTime ??
									(prepTime && cookTime ? prepTime + cookTime : null),
							)}
						/>
					)}
					{calories != null && (
						<StatPill
							icon={<Flame size={15} />}
							label="Calories"
							value={`${calories} kcal`}
						/>
					)}
					{cost != null && (
						<StatPill
							icon={<DollarSign size={15} />}
							label="Est. Cost"
							value={`$${cost}`}
						/>
					)}
				</div>

				{/* ── Body: Ingredients + Instructions ── */}
				{hasBody && (
					<>
						{/* Ingredients */}
						{ingredients.length > 0 && (
							<div className="border-r border-[#eae5d8] px-6 pt-6 max-sm:border-r-0 max-sm:border-b">
								{/* Section title */}
								<p className="flex items-center gap-2 border-b border-foreground/10 pb-2 text-lg font-bold uppercase tracking-[0.12em] text-[#7BAE8A] font-[Arial,sans-serif] mb-3">
									Ingredients
								</p>

								{/* Servings scaler */}
								<div className="rc-scaler flex items-center gap-2 mb-3.5 font-[Arial,sans-serif] text-[0.78rem] text-foreground">
									<span>Servings:</span>
									<button
										type="button"
										onClick={() => setServings((s) => Math.max(1, s - 1))}
										aria-label="Decrease servings"
										className="w-6 h-6 border-[1.5px] border-foreground rounded-full bg-transparent text-foreground text-base font-bold flex items-center justify-center leading-none transition-colors hover:bg-[#1e1e1e] hover:text-[#fffef9]"
									>
										−
									</button>
									<span className="font-bold text-[0.9rem] text-foreground min-w-[20px] text-center">
										{servings}
									</span>
									<button
										type="button"
										onClick={() => setServings((s) => s + 1)}
										aria-label="Increase servings"
										className="w-6 h-6 border-[1.5px] border-foreground rounded-full bg-transparent text-foreground text-base font-bold flex items-center justify-center leading-none transition-colors hover:bg-[#1e1e1e] hover:text-[#fffef9]"
									>
										+
									</button>
								</div>

								{ingredients.map((ing, i) => {
									if (ing.group === "header") {
										return (
											<p
												key={i}
												className="text-[0.68rem] uppercase tracking-[0.08em] font-bold text-foreground font-[Arial,sans-serif] mt-3 mb-1 pb-1 border-b border-dashed border-[#ddd]"
											>
												{ing.name}
											</p>
										);
									}
									const checked = checkedIngredients.has(i);
									return (
										<label
											key={i}
											className={`flex items-start gap-2 py-[0.28rem] cursor-pointer select-none text-[0.85rem] leading-[1.45] transition-opacity ${checked ? "opacity-40 line-through text-[#888]" : "text-[#1e1e1e]"}`}
										>
											<input
												type="checkbox"
												checked={checked}
												onChange={() => toggleIngredient(i)}
												className="sr-only"
											/>
											<span
												className={`w-[15px] h-[15px] border-[1.5px] border-[#7BAE8A] rounded-sm flex-shrink-0 mt-[2px] flex items-center justify-center transition-colors ${checked ? "bg-[#7BAE8A]" : ""}`}
											>
												{checked && (
													<Check size={9} strokeWidth={3.5} color="#fffef9" />
												)}
											</span>
											<span className="text-foreground">
												{ing.amount && (
													<span className="font-bold text-[#7BAE8A] font-[Arial,sans-serif] flex-shrink-0">
														{scaleAmount(ing.amount, scale)}{" "}
													</span>
												)}
												{ing.unit && (
													<span className="text-foreground/50 italic flex-shrink-0">
														{ing.unit}{" "}
													</span>
												)}
												{ing.name}
												{ing.notes && (
													<span className="text-foreground text-[0.78rem] italic">
														, {ing.notes}
													</span>
												)}
											</span>
										</label>
									);
								})}
							</div>
						)}

						{/* Instructions */}
						{instructions.length > 0 && (
							<div className="px-6 pt-6">
								<p className="flex items-center gap-2 border-b border-foreground/10 pb-2 text-lg font-bold uppercase tracking-[0.12em] text-[#7BAE8A] font-[Arial,sans-serif] mb-3">
									Instructions
								</p>
								{instructions.map((inst, i) => {
									if (inst.group === "header") {
										return (
											<p
												key={i}
												className="text-[0.68rem] uppercase tracking-[0.08em] font-bold text-foreground font-[Arial,sans-serif] mt-3 mb-1 pb-1 border-b border-dashed border-[#ddd]"
											>
												{inst.text}
											</p>
										);
									}
									const checked = checkedSteps.has(i);
									return (
										<label
											key={i}
											className={`flex items-start gap-3 py-2 cursor-pointer select-none transition-opacity ${checked ? "opacity-40" : ""}`}
										>
											<input
												type="checkbox"
												checked={checked}
												onChange={() => toggleStep(i)}
												className="sr-only"
											/>
											<span
												className={`w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center mt-[1px] text-[0.72rem] font-bold font-[Arial,sans-serif] text-[#fffef9] dark:text-background dark:bg-white transition-colors ${checked ? "bg-[#7BAE8A]" : "bg-[#1e1e1e]"}`}
											>
												{checked ? (
													<Check size={11} strokeWidth={3} />
												) : (
													inst.step
												)}
											</span>
											<p className="text-[0.88rem] leading-[1.65] text-foreground pt-[3px] m-0">
												{inst.text}
											</p>
										</label>
									);
								})}
							</div>
						)}
					</>
				)}

				{/* ── Notes ── */}
				{notes && (
					<div className="px-6 pt-6">
						<p className="flex items-center gap-2 border-b border-foreground/10 pb-2 text-lg font-bold uppercase tracking-[0.12em] text-[#7BAE8A] font-[Arial,sans-serif] mb-3">
							Recipe Notes
						</p>
						<div className="text-[0.86rem] leading-[1.7] text-foreground whitespace-pre-line">
							{notes}
						</div>
					</div>
				)}

				{/* ── Nutrition ── */}
				{nutrition && (
					<div className="px-6 pt-6 pb-4">
						<p className="flex items-center gap-2 border-b border-foreground/10 pb-2 text-lg font-bold uppercase tracking-[0.12em] text-[#7BAE8A] font-[Arial,sans-serif] mb-3">
							Nutrition Info
						</p>
						<NutritionGrid raw={nutrition} />
					</div>
				)}

				{/* ── Footer ── */}
				<div className="bg-[#f5f0e5] border-t border-[#eae5d8] px-6 py-2.5 flex items-center justify-between font-[Arial,sans-serif] text-[0.7rem] text-foreground gap-4 flex-wrap">
					<div
						className="flex gap-0.5 text-[#e8a000]"
						role="img"
						aria-label="5 star recipe"
					>
						{[...Array(5)].map((_, i) => (
							<Star key={i} size={12} fill="currentColor" strokeWidth={0} />
						))}
					</div>
					<span className="text-black">Recipe by {author}</span>
				</div>
			</div>
		</>
	);
}
