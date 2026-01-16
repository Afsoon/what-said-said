import type { ReactNode } from "react";
import { ClientLink } from "./link";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";

type PostListItemProps = {
  url: string;
  title: string;
  description: string;
  date: string;
};

const PostListItem = ({ postItem }: { postItem: PostListItemProps }) => (
  <li key={postItem.url} className="-mx-px first:-mt-4 sm:first:-mt-6 lg:first:-mt-12">
    <ClientLink
      href={postItem.url}
      className="hover:ring-primary text-fg block w-full rounded-xl border px-4 py-2 duration-300 ease-in-out hover:-translate-y-2 hover:rounded-lg hover:shadow-xl hover:ring-2 hover:ring-offset-2 motion-safe:transition-all"
    >
      <Text>{postItem.date}</Text>
      <Heading level={3} className="font-headline text-2xl leading-none sm:text-3xl">
        {postItem.title}
      </Heading>
      <Text className="mt-2 line-clamp-2 h-full max-h-15 text-sm leading-snug font-normal">
        {postItem.description}
      </Text>
    </ClientLink>
  </li>
);

export const PostList = ({ posts }: { posts: PostListItemProps[] }) => (
  <ul className="-mx-4 -mt-px flex flex-col gap-6 sm:-mx-6 lg:-mx-12 lg:gap-12">
    {posts.map((post) => (
      <PostListItem key={post.url} postItem={post} />
    ))}
  </ul>
);

export const PostListContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative z-10 mx-auto w-full max-w-[80ch] pt-16 text-white lg:pt-36 xl:-right-[calc(296px/2)] 2xl:right-auto">
    {children}
  </div>
);
