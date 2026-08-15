import { createDefaultImport, defineCollection, defineConfig } from "@content-collections/core";
import type { MDXContent } from "mdx/types";
import * as v from "valibot";

const posts = defineCollection({
	name: "posts",
	directory: "content/posts",
	include: "**/*.mdx",
	parser: "frontmatter-only",
	schema: v.object({
		title: v.string(),
		description: v.string(),
		date: v.string(),
		updated_at: v.nullish(v.string()),
		tag: v.array(v.string()),
	}),
	transform: (post) => ({
		...post,
		slug: post._meta.path,
		mdx: createDefaultImport<MDXContent>(`~content/posts/${post._meta.filePath}`),
	}),
});

export default defineConfig({
	content: [posts],
});
