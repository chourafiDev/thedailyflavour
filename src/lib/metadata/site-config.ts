export const siteConfig = {
	name: "The Daily Flavour",
	shortName: "Daily Flavour",
	title: "The Daily Flavour: Quick Global Recipes for Busy Families",
	description:
		"World flavours on your table in 30 minutes. Quick, delicious recipes the whole family will love — from Thai stir-fries to Mexican bowls, Indian curries and beyond.",
	url: "https://thedailyflavour.com",
	ogImage: "/og-image.png",
	twitterImage: "/og-image.png",
	links: {
		instagram: "https://instagram.com/thedailyflavour",
		pinterest: "https://pinterest.com/thedailyflavour",
		tiktok: "https://tiktok.com/@thedailyflavour",
	},
	creator: {
		name: "Remi Cassidy",
		email: "hello@thedailyflavour.com",
		twitter: "@thedailyflavour",
	},
	keywords: [
		"quick recipes",
		"easy dinner recipes",
		"family recipes",
		"global recipes",
		"weeknight dinners",
		"30 minute meals",
		"healthy dinner ideas",
		"quick family meals",
		"world cuisine recipes",
		"The Daily Flavour",
		"easy global recipes",
		"quick dinner ideas",
		"recipe blog",
		"home cooking",
	],
	categories: {
		dinner: {
			title: "Quick Dinner Recipes",
			description:
				"Easy weeknight dinner recipes the whole family will love. Quick global flavours from Thai stir-fries to Mexican bowls, all ready in 30 minutes.",
			slug: "dinner",
			keywords: [
				"dinner recipes",
				"easy dinner",
				"weeknight meals",
				"quick dinner ideas",
			],
		},
		breakfast: {
			title: "Breakfast Recipes",
			description:
				"Quick and easy breakfast ideas for every kind of morning — speedy weekday grab-and-go meals and lazy weekend brunch spreads.",
			slug: "breakfast",
			keywords: [
				"breakfast recipes",
				"brunch ideas",
				"quick breakfast",
				"easy breakfast",
			],
		},
		dessert: {
			title: "Dessert Recipes",
			description:
				"Simple, indulgent desserts from around the world — no-bake treats, quick chocolate fixes, and crowd-pleasing sweets the whole family will devour.",
			slug: "dessert",
			keywords: [
				"dessert recipes",
				"easy desserts",
				"no bake desserts",
				"sweet treats",
			],
		},
		drinks: {
			title: "Drinks & Beverages",
			description:
				"Refreshing, nourishing and festive drinks for every occasion — morning smoothies, afternoon pick-me-ups, party mocktails and cosy hot drinks.",
			slug: "drinks",
			keywords: ["drink recipes", "smoothies", "mocktails", "homemade drinks"],
		},
		asian: {
			title: "Asian Recipes",
			description:
				"Quick and easy Asian-inspired meals — Thai, Korean, Japanese, Chinese and Vietnamese dishes ready in under 30 minutes.",
			slug: "asian",
			keywords: [
				"asian recipes",
				"thai recipes",
				"korean recipes",
				"japanese dinner",
				"stir fry",
			],
		},
		healthy: {
			title: "Healthy Recipes",
			description:
				"Clean, nourishing recipes that don't sacrifice flavour. Gluten-free, dairy-free, high-protein and vegetable-forward meals for every day.",
			slug: "healthy",
			keywords: [
				"healthy recipes",
				"clean eating",
				"gluten free",
				"high protein meals",
				"healthy dinner",
			],
		},
		"meal-prep": {
			title: "Meal Prep Recipes",
			description:
				"Batch cooking guides, make-ahead recipes and weekly prep ideas to set your week up for easy, delicious meals every single night.",
			slug: "meal-prep",
			keywords: [
				"meal prep",
				"batch cooking",
				"make ahead meals",
				"sunday meal prep",
			],
		},
		"one-pan": {
			title: "One Pan Dinners",
			description:
				"Sheet pan and one pot dinners with minimal washing up. All the flavour, none of the mess — perfect for busy weeknights.",
			slug: "one-pan",
			keywords: [
				"one pan dinners",
				"sheet pan meals",
				"one pot recipes",
				"easy cleanup dinner",
			],
		},
	},
	social: {
		instagram: {
			handle: "@thedailyflavour",
			url: "https://instagram.com/thedailyflavour",
		},
		pinterest: {
			handle: "@the_daily_flavour",
			url: "https://pinterest.com/the_daily_flavour",
		},
	},
	contact: {
		email: "contact@thedailyflavour.com",
	},
	branding: {
		tagline: "Quick global recipes for busy families",
		mission:
			"Bringing world flavours to your family table — quick, delicious and made for real weeknights.",
		colors: {
			primary: "#E16C87",
			secondary: "#FAF4F0",
		},
	},
} as const;

export type SiteConfig = typeof siteConfig;
