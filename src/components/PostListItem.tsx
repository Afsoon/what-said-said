import type { CollectionEntry } from "astro:content";
import { normalizeSlug } from "../i18n/utils";

export const PostListItem = ({ post, lang }: { post: CollectionEntry<"blog">; lang: string }) => {
  const { data, slug } = post;
  const { title, description, pubDate, topics } = data;
  return (
    <div class="post flex flex-col gap-1">
      <h2 class="m-0 text-lg">
        <a
          class="text-blue-600 no-underline hover:underline"
          href={`/${lang}/blog/${normalizeSlug(slug)}/`}
        >
          {title}
        </a>
      </h2>
      <p class="text-sm italic">{description}</p>
      <div class="info dot-separated flex items-center text-sm text-gray-600">
        <time datetime={pubDate.toISOString()}>
          {pubDate.toLocaleDateString(lang, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <p class="m-0 text-sm">topics: {topics.join(", ")}</p>
      </div>
    </div>
  );
};
