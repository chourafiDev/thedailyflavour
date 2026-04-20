export interface BlogPost {
	title: string;
	description: string;
	slug: string;
	author: string;
	publishedDate: string;
	modifiedDate?: string;
	category: string;
	tags: string[];
	image: string;
	imageAlt?: string;
	readingTime?: string;
	excerpt?: string;
}

export interface CategoryInfo {
	title: string;
	description: string;
	slug: string;
	keywords: string[];
}

export interface Person {
	"@type": "Person";
	name: string;
	url?: string;
	image?: string;
}

export interface Organization {
	"@type": "Organization";
	name: string;
	url: string;
	logo: {
		"@type": "ImageObject";
		url: string;
	};
	sameAs?: string[];
}
