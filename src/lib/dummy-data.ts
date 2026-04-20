export interface DummyRecipe {
	slug: string;
	title: string;
	excerpt: string;
	publishedAt: string;
	isTrending?: boolean;
	isFeatured?: boolean;
	author: { name: string; slug: string };
	category: { title: string; slug: string };
	mainImage: { url: string; alt: string };
	recipeDetails: {
		prepTime: number;
		cookTime: number;
		servings: number;
		cuisine: string;
		difficulty: string;
		calories: number;
	};
}

export interface DummyCategory {
	slug: string;
	title: string;
	count: number;
	image: { url: string; alt: string };
}

// ── Placeholder images (Unsplash — free to use) ──────────────
const IMGS = {
	thai: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80",
	pasta: "https://images.unsplash.com/photo-1551183053-bf91798d452e?w=800&q=80",
	tacos:
		"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
	curry:
		"https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
	salad:
		"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
	shakshuka:
		"https://images.unsplash.com/photo-1588684650597-f9d1b4f8e932?w=800&q=80",
	pancakes:
		"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
	smoothie:
		"https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80",
	tiramisu:
		"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
	chicken:
		"https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&q=80",
	ramen:
		"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
	bowl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
	// category covers
	breakfast_c:
		"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
	dinner_c:
		"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
	dessert_c:
		"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
	drinks_c:
		"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
	asian_c:
		"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
	healthy_c:
		"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
};

// ── All dummy recipes ─────────────────────────────────────────
export const dummyRecipes: DummyRecipe[] = [
	{
		slug: "thai-basil-chicken-25-minutes",
		title: "25-Min Thai Basil Chicken — Better Than Takeout",
		excerpt:
			"Bold, fragrant Thai basil chicken ready in 25 minutes. One pan, real flavours, the whole family will love it.",
		publishedAt: "2026-03-15T10:00:00Z",
		isTrending: true,
		isFeatured: true,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.chicken, alt: "Thai basil chicken in a wok" },
		recipeDetails: {
			prepTime: 10,
			cookTime: 15,
			servings: 4,
			cuisine: "Thai",
			difficulty: "Easy",
			calories: 420,
		},
	},
	{
		slug: "creamy-tuscan-pasta",
		title: "Creamy Tuscan Pasta in 20 Minutes",
		excerpt:
			"Sun-dried tomatoes, spinach and parmesan in the creamiest sauce. A weeknight pasta that feels like a restaurant meal.",
		publishedAt: "2026-03-10T10:00:00Z",
		isTrending: true,
		isFeatured: true,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.tiramisu, alt: "Creamy Tuscan pasta in a pan" },
		recipeDetails: {
			prepTime: 5,
			cookTime: 15,
			servings: 2,
			cuisine: "Italian",
			difficulty: "Easy",
			calories: 580,
		},
	},
	{
		slug: "crispy-fish-tacos-mango-salsa",
		title: "Crispy Fish Tacos with Mango Salsa",
		excerpt:
			"Golden crispy fish, fresh mango salsa and a lime crema. The taco night upgrade your family has been waiting for.",
		publishedAt: "2026-03-05T10:00:00Z",
		isTrending: true,
		isFeatured: true,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.tacos, alt: "Crispy fish tacos with mango salsa" },
		recipeDetails: {
			prepTime: 15,
			cookTime: 15,
			servings: 4,
			cuisine: "Mexican",
			difficulty: "Medium",
			calories: 380,
		},
	},
	{
		slug: "30-minute-butter-chicken",
		title: "30-Minute Weeknight Butter Chicken",
		excerpt:
			"All the depth of a slow-cooked curry in 30 minutes. Rich, velvety, mildly spiced — kids and adults both obsessed.",
		publishedAt: "2026-02-28T10:00:00Z",
		isTrending: true,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.curry, alt: "Butter chicken in a bowl with rice" },
		recipeDetails: {
			prepTime: 10,
			cookTime: 20,
			servings: 4,
			cuisine: "Indian",
			difficulty: "Easy",
			calories: 510,
		},
	},
	{
		slug: "greek-salad-grain-bowl",
		title: "Greek Salad Grain Bowl — 15 Minutes",
		excerpt:
			"Fluffy quinoa, crisp cucumbers, kalamata olives and creamy feta. A healthy lunch you'll want to meal prep every Sunday.",
		publishedAt: "2026-02-20T10:00:00Z",
		isTrending: false,
		isFeatured: true,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: {
			url: IMGS.salad,
			alt: "Greek grain bowl with quinoa and feta",
		},
		recipeDetails: {
			prepTime: 10,
			cookTime: 5,
			servings: 2,
			cuisine: "Mediterranean",
			difficulty: "Easy",
			calories: 340,
		},
	},
	{
		slug: "shakshuka-spiced-tomato-eggs",
		title: "Easy Shakshuka — Eggs in Spiced Tomato Sauce",
		excerpt:
			"A Middle Eastern breakfast classic that doubles as a quick dinner. One pan, 20 minutes, infinite flavour.",
		publishedAt: "2026-02-15T10:00:00Z",
		isTrending: false,
		isFeatured: true,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Breakfast", slug: "breakfast" },
		mainImage: {
			url: IMGS.smoothie,
			alt: "Shakshuka with eggs in tomato sauce",
		},
		recipeDetails: {
			prepTime: 5,
			cookTime: 15,
			servings: 2,
			cuisine: "Middle Eastern",
			difficulty: "Easy",
			calories: 280,
		},
	},
	{
		slug: "fluffy-ricotta-pancakes",
		title: "Fluffy Ricotta Pancakes with Honey",
		excerpt:
			"The fluffiest pancakes you'll ever make. Creamy ricotta makes all the difference — weekend breakfast sorted.",
		publishedAt: "2026-02-10T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Breakfast", slug: "breakfast" },
		mainImage: {
			url: IMGS.pancakes,
			alt: "Stack of fluffy ricotta pancakes with honey",
		},
		recipeDetails: {
			prepTime: 10,
			cookTime: 15,
			servings: 4,
			cuisine: "American",
			difficulty: "Easy",
			calories: 320,
		},
	},
	{
		slug: "mango-lassi-5-minutes",
		title: "Creamy Mango Lassi in 5 Minutes",
		excerpt:
			"Thick, sweet, ice-cold mango lassi with just 3 ingredients. The perfect drink for hot days or alongside a spicy curry.",
		publishedAt: "2026-02-05T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Drinks", slug: "drinks" },
		mainImage: {
			url: IMGS.smoothie,
			alt: "Mango lassi in a glass with a straw",
		},
		recipeDetails: {
			prepTime: 5,
			cookTime: 0,
			servings: 2,
			cuisine: "Indian",
			difficulty: "Easy",
			calories: 180,
		},
	},
	{
		slug: "no-bake-tiramisu-cups",
		title: "No-Bake Tiramisu Cups — 15 Minutes",
		excerpt:
			"Individual tiramisu cups with a proper espresso kick. No baking, no fuss, everyone thinks you spent hours.",
		publishedAt: "2026-01-30T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dessert", slug: "dessert" },
		mainImage: { url: IMGS.tiramisu, alt: "Tiramisu cups in glasses" },
		recipeDetails: {
			prepTime: 15,
			cookTime: 0,
			servings: 4,
			cuisine: "Italian",
			difficulty: "Easy",
			calories: 290,
		},
	},
	{
		slug: "korean-ground-beef-bowl",
		title: "Korean Ground Beef Bowl — One Pan, 20 Min",
		excerpt:
			"Sweet, savoury, garlicky Korean beef over fluffy rice. Budget-friendly, endlessly satisfying, kids ask for seconds.",
		publishedAt: "2026-01-25T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.bowl, alt: "Korean ground beef rice bowl" },
		recipeDetails: {
			prepTime: 5,
			cookTime: 15,
			servings: 4,
			cuisine: "Korean",
			difficulty: "Easy",
			calories: 460,
		},
	},
	{
		slug: "lemon-garlic-chicken-sheet-pan",
		title: "Sheet Pan Lemon Garlic Chicken",
		excerpt:
			"Juicy chicken thighs, roasted vegetables, bright lemon and garlic. One pan, 30 minutes, zero washing up.",
		publishedAt: "2026-01-20T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: {
			url: IMGS.chicken,
			alt: "Sheet pan lemon garlic chicken with vegetables",
		},
		recipeDetails: {
			prepTime: 10,
			cookTime: 25,
			servings: 4,
			cuisine: "Mediterranean",
			difficulty: "Easy",
			calories: 490,
		},
	},
	{
		slug: "japanese-ramen-30-minutes",
		title: "Quick Japanese Ramen from Scratch — 30 Min",
		excerpt:
			"A deeply flavoured ramen broth you won't believe came together in 30 minutes. Top with a soft egg and you're done.",
		publishedAt: "2026-01-15T10:00:00Z",
		isTrending: false,
		isFeatured: false,
		author: { name: "Remi Cassidy", slug: "remi-cassidy" },
		category: { title: "Dinner", slug: "dinner" },
		mainImage: { url: IMGS.ramen, alt: "Japanese ramen in a bowl" },
		recipeDetails: {
			prepTime: 10,
			cookTime: 20,
			servings: 2,
			cuisine: "Japanese",
			difficulty: "Medium",
			calories: 520,
		},
	},
];

// ── Trending (first 4 with isTrending = true) ─────────────────
export const dummyTrendingPosts = dummyRecipes
	.filter((r) => r.isTrending)
	.slice(0, 4);

// ── Featured (first 5 with isFeatured = true) ─────────────────
export const dummyFeaturedPosts = dummyRecipes
	.filter((r) => r.isFeatured)
	.slice(0, 5);

// ── Banner (all, for carousel) ────────────────────────────────
export const dummyBannerPosts = dummyRecipes.slice(0, 6);

// ── Most Popular by category ──────────────────────────────────
export const dummyPostsByCategory = (slug: string, qty = 3) =>
	dummyRecipes.filter((r) => r.category.slug === slug).slice(0, qty);

// ── Categories ────────────────────────────────────────────────
export const dummyCategories: DummyCategory[] = [
	{
		slug: "breakfast",
		title: "Breakfast",
		count: 12,
		image: { url: IMGS.breakfast_c, alt: "Breakfast recipes" },
	},
	{
		slug: "dinner",
		title: "Dinner",
		count: 34,
		image: { url: IMGS.dinner_c, alt: "Dinner recipes" },
	},
	{
		slug: "dessert",
		title: "Dessert",
		count: 18,
		image: { url: IMGS.dessert_c, alt: "Dessert recipes" },
	},
	{
		slug: "drinks",
		title: "Drinks",
		count: 9,
		image: { url: IMGS.drinks_c, alt: "Drinks recipes" },
	},
	{
		slug: "asian",
		title: "Asian",
		count: 21,
		image: { url: IMGS.asian_c, alt: "Asian recipes" },
	},
	{
		slug: "healthy",
		title: "Healthy",
		count: 16,
		image: { url: IMGS.healthy_c, alt: "Healthy recipes" },
	},
];
