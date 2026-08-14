import { Link, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "content-collections";

const getPosts = createServerFn({ method: "GET" }).handler(async () =>
	allPosts.map(({ mdx: _mdx, ...post }) => post).sort((a, b) => b.date.localeCompare(a.date)),
);

export const Route = createFileRoute("/")({
	loader: () => getPosts(),
	head: () => ({ meta: [{ title: "Blog" }] }),
	component: BlogIndex,
});

function BlogIndex() {
	const posts = Route.useLoaderData();

	return (
		<main className="page-wrap px-4 py-12">
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-2">Blog</p>
				<ul className="m-0 flex list-none flex-col gap-6 p-0">
					{posts.map((post) => (
						<li key={post.slug}>
							<Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
								<h2 className="mb-1 text-2xl font-bold text-[var(--sea-ink)] group-hover:underline">{post.title}</h2>
								<p className="m-0 text-base leading-7 text-[var(--sea-ink-soft)]">{post.description}</p>
								<p className="mt-1 mb-0 text-sm text-[var(--sea-ink-soft)]">
									<time dateTime={post.date}>{post.date}</time>
									{post.tag.length > 0 ? ` — ${post.tag.join(", ")}` : null}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
