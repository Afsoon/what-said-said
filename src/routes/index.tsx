import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "content-collections";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { Link } from "#/components/base/link/link.tsx";

type Article = Omit<(typeof allPosts)[0], "mdx" | "_meta">;

const Simple01Horizontal = ({ article }: { article: Article }) => (
	<div className="flex flex-col gap-4 xl:flex-row xl:items-start">
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<span className="text-sm font-semibold text-brand-secondary">{article.tag[0]}</span>

				<div className="flex flex-col gap-1">
					<Link
						to="/blog/$slug"
						params={{ slug: article.slug }}
						className="flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 underline underline-offset-2 "
					>
						{article.title}
					</Link>

					<p className="line-clamp-2 text-md text-tertiary">{article.description}</p>
				</div>
			</div>

			<p className="text-sm text-tertiary">
				{new Date(article.date).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				})}
			</p>
		</div>
	</div>
);

const getPosts = createServerFn({ method: "GET" }).handler(() =>
	allPosts.map(({ mdx: _mdx, ...post }) => post).sort((a, b) => b.date.localeCompare(a.date)),
);

export const Route = createFileRoute("/")({
	loader: () => getPosts(),
	head: () => ({ meta: [{ title: "Blog" }] }),
	component: BlogIndex,
});

function BlogIndex() {
	const articles = Route.useLoaderData();
	const isDesktop = useBreakpoint("lg");

	return (
		<div className="bg-primary py-16 md:py-24">
			<section className="mx-auto flex w-full max-w-container flex-col gap-12 bg-primary px-4 pb-16 md:gap-16 md:px-8 md:pb-24">
				<ul className="mx-auto grid grid-cols-1 gap-x-8 gap-y-12 sm:max-w-lg xl:max-w-3xl">
					{articles.map((article) => (
						<li key={article.slug} className={cx(!isDesktop && "nth-[n+7]:hidden")}>
							<Simple01Horizontal article={article} />
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
