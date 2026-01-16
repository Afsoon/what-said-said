import { ArticleItem, HomeHero } from "@/components/home_hero";
import { readFileSync, readdirSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import type { BlogFrontmatter } from "@/types";

type ArticleItemRaw = ArticleItem & { rawDate: string };

export default async function HomePage() {
  const articles = await getArticles();
  const tils = await getTILs();

  const all = [...articles, ...tils].sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1));

  return (
    <HomeHero
      allArticles={all.slice(0, 9)}
      blogArticles={articles.slice(0, 9)}
      tilArticles={tils.slice(0, 9)}
    />
  );
}

const getArticles = async () => {
  const blogFileNames: Array<string> = [];
  const blogArticles: Array<ArticleItemRaw> = [];

  readdirSync("./private/contents").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogFileNames.push(fileName);
    }
  });

  for await (const fileName of blogFileNames) {
    const path = `./private/contents/${fileName}`;
    const source = readFileSync(path, "utf8");
    const mdx = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });
    const frontmatter = mdx.frontmatter as BlogFrontmatter;

    const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const slug = fileName.substring(0, fileName.length - 4);

    const article = {
      type: "blog",
      slug,
      url: `/blog/${slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      date,
      tags: frontmatter.tag.map((tag) => ({ id: `${slug}-${tag}`, name: tag })),
      rawDate: frontmatter.date,
    } as ArticleItemRaw;

    blogArticles.push(article);
  }

  return blogArticles.sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1));
};

const getTILs = async () => {
  const tilFileNames: Array<string> = [];
  const tilArticles: Array<ArticleItemRaw> = [];

  readdirSync("./private/til").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      tilFileNames.push(fileName);
    }
  });

  for await (const fileName of tilFileNames) {
    const path = `./private/til/${fileName}`;
    const source = readFileSync(path, "utf8");
    const mdx = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });
    const frontmatter = mdx.frontmatter as BlogFrontmatter;

    const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const slug = fileName.substring(0, fileName.length - 4);

    const til = {
      type: "til",
      slug,
      url: `/til/${slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      date,
      tags: frontmatter.tag.map((tag) => ({ id: `${slug}-${tag}`, name: tag })),
      rawDate: frontmatter.date,
    } as ArticleItemRaw;

    tilArticles.push(til);
  }

  return tilArticles.sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1));
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
