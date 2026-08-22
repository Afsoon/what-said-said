import { createHash } from "node:crypto";
import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";
import satori from "satori";
import { SITE_DESCRIPTION, SITE_NAME } from "../src/utils/seo.ts";

// Bump to invalidate every cached image after a template redesign.
const TEMPLATE_VERSION = 1;

const OUT_DIR = "public/og";
const MANIFEST_PATH = join(OUT_DIR, "manifest.json");
const POSTS_DIR = "content/posts";
const FONT_DIR = "node_modules/@fontsource/inter/files";

// Tokens mirrored from src/styles/theme.css (light palette).
const COLOR_BG = "#ffffff";
const COLOR_TITLE = "#181d27"; // text-primary
const COLOR_BODY = "#535862"; // text-tertiary
const COLOR_BRAND = "#7f56d9"; // brand-600

const KICKER = SITE_NAME;

type Page = { id: string; title: string; description: string };

async function collectPages(): Promise<Page[]> {
	const pages: Page[] = [
		{ id: "home", title: "Said's digital garden", description: SITE_DESCRIPTION },
		// Keep in sync with the copy in src/routes/about.tsx.
		{
			id: "about",
			title: "Hi, I'm Said.",
			description: "Who is behind WhatSaidSaid and what this blog is about.",
		},
	];

	for (const file of await readdir(POSTS_DIR)) {
		if (!file.endsWith(".mdx")) continue;
		const { data } = matter(await readFile(join(POSTS_DIR, file), "utf8"));
		pages.push({
			id: file.replace(/\.mdx$/, ""),
			title: String(data.title ?? ""),
			description: String(data.description ?? ""),
		});
	}

	return pages;
}

function card(page: Page) {
	return {
		type: "div",
		props: {
			style: {
				width: "1200px",
				height: "630px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				backgroundColor: COLOR_BG,
				padding: "72px 80px 0",
				fontFamily: "Inter",
			},
			children: [
				{
					type: "div",
					props: {
						style: { display: "flex", flexDirection: "column" },
						children: [
							{
								type: "div",
								props: {
									style: { fontSize: "30px", fontWeight: 700, color: COLOR_BRAND },
									children: KICKER,
								},
							},
							{
								type: "div",
								props: {
									style: {
										marginTop: "36px",
										fontSize: "64px",
										fontWeight: 700,
										color: COLOR_TITLE,
										lineHeight: 1.15,
										letterSpacing: "-0.02em",
										lineClamp: 3,
									},
									children: page.title,
								},
							},
							{
								type: "div",
								props: {
									style: {
										marginTop: "28px",
										fontSize: "30px",
										color: COLOR_BODY,
										lineHeight: 1.4,
										lineClamp: 2,
									},
									children: page.description,
								},
							},
						],
					},
				},
				{
					type: "div",
					props: {
						style: { height: "12px", margin: "0 -80px", backgroundColor: COLOR_BRAND },
					},
				},
			],
		},
	};
}

function hashPage(page: Page): string {
	return createHash("sha256")
		.update(JSON.stringify({ ...page, kicker: KICKER, v: TEMPLATE_VERSION }))
		.digest("hex")
		.slice(0, 16);
}

async function fileExists(path: string): Promise<boolean> {
	return access(path).then(
		() => true,
		() => false,
	);
}

async function main() {
	await mkdir(OUT_DIR, { recursive: true });

	const manifest: Record<string, string> = await readFile(MANIFEST_PATH, "utf8")
		.then((raw) => JSON.parse(raw))
		.catch(() => ({}));

	const [regular, bold] = await Promise.all([
		readFile(join(FONT_DIR, "inter-latin-400-normal.woff")),
		readFile(join(FONT_DIR, "inter-latin-700-normal.woff")),
	]);

	const pages = await collectPages();
	const next: Record<string, string> = {};
	let rendered = 0;

	for (const page of pages) {
		const hash = hashPage(page);
		const out = join(OUT_DIR, `${page.id}.png`);
		next[page.id] = hash;

		if (manifest[page.id] === hash && (await fileExists(out))) continue;

		const svg = await satori(card(page) as unknown as Parameters<typeof satori>[0], {
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Inter", data: regular, weight: 400, style: "normal" },
				{ name: "Inter", data: bold, weight: 700, style: "normal" },
			],
		});
		await writeFile(out, new Resvg(svg).render().asPng());
		rendered++;
		console.log(`og: rendered ${page.id}.png`);
	}

	await writeFile(MANIFEST_PATH, `${JSON.stringify(next, null, "\t")}\n`);
	console.log(`og: ${rendered} rendered, ${pages.length - rendered} cached`);
}

await main();
