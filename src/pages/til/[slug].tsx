import { PostPage } from "@/components/post-page";
import { getPostPaths } from "@/lib/get-file-name";

type BlogArticlePageProps = {
  slug: string;
};

export default async function BlogArticlePage({ slug }: BlogArticlePageProps) {
  return <PostPage slug={slug} folder="./private/til" />;
}

export const getConfig = async () => {
  const blogPaths = await getPostPaths("./private/til");

  return {
    render: "static",
    staticPaths: blogPaths,
  } as const;
};
