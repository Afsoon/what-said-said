import { readFileSync } from "node:fs";
import { getFileName } from "@/lib/get-file-name";
import { compilePost } from "@/lib/mdx";
import { components } from "./mdx";
import { Meta } from "./meta";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export async function PostPage({
  slug,
  folder,
  basePath,
}: {
  slug: string;
  folder: string;
  basePath: string;
}) {
  const fileName = await getFileName(folder, slug);

  if (!fileName) {
    return null;
  }

  const path = `${folder}/${fileName}`;
  const source = readFileSync(path, "utf8");
  const { Content, frontmatter } = await compilePost(source);

  const date = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  return (
    <main className="relative px-8 pb-24 lg:pb-32">
      <Meta
        title={`${frontmatter.title} — Waku`}
        description={frontmatter.description}
        path={`${basePath}/${slug}`}
      />
      <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-16 lg:pt-36 xl:-right-[calc(296px/2)] 2xl:right-auto">
        <div className="mb-8 flex items-center gap-2 sm:gap-4">
          <Text className="font-label text-[11px]">{date}</Text>
        </div>
        <Heading level={1} className="font-headline text-3xl leading-none text-pretty sm:text-6xl">
          {frontmatter.title}
        </Heading>
        <Heading
          level={3}
          className="mt-2 text-lg leading-snug font-normal sm:mt-1 sm:text-xl sm:font-bold"
        >
          {frontmatter.description}
        </Heading>
        <hr className="mt-2 h-px border-none bg-gray-800" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-8 lg:pt-16 xl:-right-[calc(296px/2)] 2xl:right-auto">
        <Content components={components} />
      </div>
    </main>
  );
}
