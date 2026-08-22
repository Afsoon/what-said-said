import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { renderServerComponent } from "@tanstack/react-start/rsc";
import { allPosts } from "content-collections";
import { components } from "#/components/mdx/components";
import { useClipboard } from "#/hooks/use-clipboard";
import { SITE_NAME, seo } from "#/utils/seo";
import { Check, Copy01 } from "@untitledui/icons";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";

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
	head: ({ loaderData }) =>
		loaderData
			? seo({
					title: `${loaderData.title} | ${SITE_NAME}`,
					description: loaderData.description,
					path: `/blog/${loaderData.slug}`,
					image: `/og/${loaderData.slug}.png`,
					type: "article",
					publishedTime: loaderData.date,
					modifiedTime: loaderData.updated_at,
				})
			: {},
	pendingComponent: () => <main className="page-wrap px-4 py-12">Loading…</main>,
	notFoundComponent: () => <main className="page-wrap px-4 py-12">Post not found.</main>,
	component: PostPage,
});

function PostPage() {
	const article = Route.useLoaderData();
	const { copied, copy } = useClipboard();

	return (
		<div className="bg-primary">
			<div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-24">
				<div className="w-full max-w-3xl">
					<BadgeGroup size="md" addonText="Tags" color="brand" theme="light" className="pr-3" iconTrailing={null}>
						{article.tags.join(", ")}
					</BadgeGroup>

					<h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg">{article.title}</h1>
					<p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">{article.description}</p>
				</div>
				<div className="mt-16 w-full">
					<div className="mt-8 flex items-start justify-between gap-24">
						<dl className="flex gap-12 md:gap-12">
							<div>
								<dt className="text-sm font-semibold text-brand-secondary">Published on</dt>
								<dd className="mt-3 text-lg font-medium text-primary">
									{new Date(article.date).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</dd>
							</div>
						</dl>

						<div className="hidden gap-3 md:flex">
							<Button
								color="secondary"
								size="md"
								onClick={() => {
									copy(window.location.href);
								}}
								iconLeading={copied ? Check : Copy01}
							>
								{copied ? "Copied" : "Copy link"}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto max-w-container px-4 pb-16 md:px-8 md:pb-24">
				<div className="mx-auto flex max-w-180 flex-col justify-center gap-12 md:items-start lg:max-w-none lg:flex-row lg:gap-24">
					<div className="prose max-w-180 md:prose-lg">{article.body}</div>
				</div>
			</div>
		</div>
	);
}
