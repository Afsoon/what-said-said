import { readFileSync, readdirSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { Meta } from "@/components/meta";
import { PostList, PostListContainer } from "@/components/post-list";
import type { BlogFrontmatter } from "@/types";

export default async function BlogIndexPage() {
  const articles = await getArticles();

  return (
    <main className="relative px-8 pb-24 lg:pb-32">
      <Meta title="What Said Said blog" description="List of available TIL" />
      <PostListContainer>
        <PostList posts={articles} />
      </PostListContainer>
    </main>
  );
}

const getArticles = async () => {
  const blogFileNames: Array<string> = [];
  const blogArticles: Array<{
    url: string;
    title: string;
    description: string;
    date: string;
    rawDate: string;
  }> = [];

  readdirSync("./private/til").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogFileNames.push(fileName);
    }
  });

  for await (const fileName of blogFileNames) {
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

    const article = {
      url: `/til/${fileName.substring(0, fileName.length - 4)}`,
      title: frontmatter.title,
      description: frontmatter.description,
      date,
      rawDate: frontmatter.date,
    };

    blogArticles.push(article);
  }

  return blogArticles.sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1));
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
