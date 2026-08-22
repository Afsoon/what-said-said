import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { SITE_URL } from "../src/utils/seo.ts";

const POSTS_DIR = "content/posts";
const OUT_PATH = "public/sitemap.xml";

type Entry = { path: string; lastmod?: string };

async function collectEntries(): Promise<Entry[]> {
	const posts: Entry[] = [];

	for (const file of await readdir(POSTS_DIR)) {
		if (!file.endsWith(".mdx")) continue;
		const { data } = matter(await readFile(join(POSTS_DIR, file), "utf8"));
		posts.push({
			path: `/blog/${file.replace(/\.mdx$/, "")}`,
			lastmod: String(data.updated_at ?? data.date ?? ""),
		});
	}
	posts.sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""));

	return [{ path: "/", lastmod: posts[0]?.lastmod }, { path: "/about" }, ...posts];
}

function toXml(entries: Entry[]): string {
	const urls = entries
		.map((entry) => {
			const loc = `${SITE_URL}${entry.path === "/" ? "" : entry.path}`;
			const lastmod = entry.lastmod ? `\n\t\t<lastmod>${entry.lastmod}</lastmod>` : "";
			return `\t<url>\n\t\t<loc>${loc}</loc>${lastmod}\n\t</url>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
	const xml = toXml(await collectEntries());
	const current = await readFile(OUT_PATH, "utf8").catch(() => "");

	if (current === xml) {
		console.log("sitemap: unchanged");
		return;
	}
	await writeFile(OUT_PATH, xml);
	console.log(`sitemap: written (${(await collectEntries()).length} urls)`);
}

await main();
