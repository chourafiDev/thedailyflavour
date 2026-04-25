import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/wordpress";

export async function GET() {
	const categories = await getAllCategories();
	const simplified = categories.map((cat: { name: string; slug: string }) => ({
		title: cat.name,
		slug: cat.slug,
	}));
	return NextResponse.json(simplified);
}
