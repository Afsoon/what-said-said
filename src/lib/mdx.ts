import { evaluate } from "@mdx-js/mdx";
import { recmaCodeHike, remarkCodeHike, type CodeHikeConfig } from "codehike/mdx";
import * as runtime from "react/jsx-runtime";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import type { BlogFrontmatter } from "@/types";

const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
};

export const compilePost = async (source: string) => {
  const file = new VFile(source);
  // strip required — else the YAML block is parsed as markdown
  matter(file, { strip: true });
  const frontmatter = (file.data.matter ?? {}) as BlogFrontmatter;

  const { default: Content } = await evaluate(file, {
    ...runtime,
    baseUrl: import.meta.url,
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  });

  return { Content, frontmatter };
};

export const readFrontmatter = (source: string): BlogFrontmatter => {
  const file = new VFile(source);
  matter(file);
  return (file.data.matter ?? {}) as BlogFrontmatter;
};
