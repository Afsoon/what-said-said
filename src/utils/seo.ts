export const SITE_NAME = "WhatSaidSaid";
export const SITE_URL = "https://whatsaidsaid.com";
export const SITE_DESCRIPTION = "Notes on work stories, courses, and experiments.";

type SeoInput = {
	title: string;
	description: string;
	/** Route path starting with "/" — becomes the canonical URL and og:url. Omit for no canonical. */
	path?: string;
	/** Path to a 1200x630 image under public/, e.g. "/og/home.png". */
	image?: string;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string | null;
};

type Meta = Record<string, string>;
type LinkTag = { rel: string; href: string };

export function seo({ title, description, path, image, type = "website", publishedTime, modifiedTime }: SeoInput): {
	meta: Meta[];
	links: LinkTag[];
} {
	const url = path ? `${SITE_URL}${path === "/" ? "" : path}` : undefined;

	const meta: Meta[] = [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: SITE_NAME },
		{ name: "twitter:card", content: image ? "summary_large_image" : "summary" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
	];

	if (url) {
		meta.push({ property: "og:url", content: url });
	}
	if (image) {
		meta.push(
			{ property: "og:image", content: `${SITE_URL}${image}` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ name: "twitter:image", content: `${SITE_URL}${image}` },
		);
	}
	if (type === "article" && publishedTime) {
		meta.push({ property: "article:published_time", content: publishedTime });
	}
	if (type === "article" && modifiedTime) {
		meta.push({ property: "article:modified_time", content: modifiedTime });
	}

	return { meta, links: url ? [{ rel: "canonical", href: url }] : [] };
}
