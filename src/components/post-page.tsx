import { readFileSync } from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getFileName } from '../lib/get-file-name';
import { components } from './mdx';
import { Meta } from './meta';
import { remarkCodeHike, recmaCodeHike } from 'codehike/mdx';
import { BlogFrontmatter } from '../types';

const chConfig = {
  components: { code: "Code" },
};

export async function PostPage({
  slug,
  folder,
}: {
  slug: string;
  folder: string;
  }) {
  console.log({
    folder, slug
  })
  const fileName = await getFileName(folder, slug);

  if (!fileName) {
    return null;
  }

  const path = `${folder}/${fileName}`;
  const source = readFileSync(path, 'utf8');
  const mdx = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      }
    },
  });
  const { content } = mdx;
  const frontmatter = mdx.frontmatter as BlogFrontmatter;

  const date = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : undefined;

  return (
    <main className="relative px-8 pb-24 lg:pb-32">
      <Meta
        title={`${frontmatter.title} — Waku`}
        description={frontmatter.description}
      />
      <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-16 text-white lg:pt-36 xl:-right-[calc(296px/2)] 2xl:right-auto">
        <div className="mb-8 flex items-center gap-2 sm:gap-4">
          {date && (
            <div className="font-label text-[11px] text-gray-400">{date}</div>
          )}
        </div>
        <h1 className="font-headline text-pretty text-3xl leading-none sm:text-6xl">
          {frontmatter.title}
        </h1>
        <h3 className="mt-2 text-lg font-normal leading-snug text-white/60 sm:mt-1 sm:text-xl sm:font-bold">
          {frontmatter.description}
        </h3>
        <hr className="mt-2 h-px border-none bg-gray-800" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-8 lg:pt-16 xl:-right-[calc(296px/2)] 2xl:right-auto">
        {content}
      </div>
    </main>
  );
}
