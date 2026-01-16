import type { ReactNode } from "react";
import { ClientLink } from "./link";

type PostListItemProps = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

const PostListItem = ({ postItem }: { postItem: PostListItemProps }) => (
  <li key={postItem.slug} className="-mx-px first:-mt-4 sm:first:-mt-6 lg:first:-mt-12">
    <ClientLink
      href={`/blog/${postItem.slug}`}
      className="group hover:border-secondary block w-full rounded-xl border border-gray-800 bg-gray-950/90 p-2 transition-colors duration-300 ease-in-out sm:p-4 lg:p-6"
    >
      <span>{postItem.date}</span>
      <h3 className="font-headline text-2xl leading-none sm:text-3xl">{postItem.title}</h3>
      <div className="mt-2 text-sm leading-snug font-normal text-white/60 sm:mt-1 sm:text-base">
        {postItem.description}
      </div>
    </ClientLink>
  </li>
);

export const PostList = ({ posts }: { posts: PostListItemProps[] }) => (
  <ul className="-mx-4 -mt-px flex flex-col gap-6 sm:-mx-6 lg:-mx-12 lg:gap-12">
    {posts.map((post) => (
      <PostListItem key={post.slug} postItem={post} />
    ))}
  </ul>
);

export const PostListContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-16 text-white lg:pt-36 xl:-right-[calc(296px/2)] 2xl:right-auto">
    {children}
  </div>
);
