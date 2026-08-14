import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { allPosts } from "content-collections";
import { components } from "#/components/mdx/components";

const getPost = createServerFn({ method: "GET" })
	.validator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const post = allPosts.find((p) => p.slug === slug);
		if (!post) {
			throw notFound();
		}
		const { mdx: Content, ...meta } = post;
		return { ...meta, body: await renderServerComponent(<Content components={components} />) };
	});

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => getPost({ data: params.slug }),
	head: ({ loaderData }) => ({
		meta: [{ title: loaderData?.title }, { name: "description", content: loaderData?.description }],
	}),
	pendingComponent: () => <main className="page-wrap px-4 py-12">Loading…</main>,
	notFoundComponent: () => <main className="page-wrap px-4 py-12">Post not found.</main>,
	component: PostPage,
});

function PostPage() {
	const post = Route.useLoaderData();

	return (
		<main className="page-wrap px-4 py-12">
			<article className="island-shell rounded-2xl p-6 sm:p-8">
				<header className="mb-8">
					<p className="island-kicker mb-2">
						<time dateTime={post.date}>{post.date}</time>
					</p>
					<h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">{post.title}</h1>
					<p className="m-0 text-base leading-8 text-[var(--sea-ink-soft)]">{post.description}</p>
				</header>
				<div className="prose max-w-none">{post.body}</div>
			</article>
		</main>
	);
}
