import { createFileRoute } from "@tanstack/react-router";
import { SITE_NAME, seo } from "#/utils/seo";

export const Route = createFileRoute("/about")({
	head: () =>
		seo({
			title: `About | ${SITE_NAME}`,
			description: "Who is behind WhatSaidSaid and what this blog is about.",
			path: "/about",
			image: "/og/about.png",
		}),
	component: About,
});

function About() {
	return (
		<main className="bg-primary flex-1">
			<div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-24">
				<div className="w-full max-w-3xl">
					<p className="text-sm font-semibold text-brand-secondary">About</p>
					<h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg">Hi, I&#39;m Said.</h1>
					<div className="scrolly-prose mt-6 flex max-w-180 flex-col gap-4 text-lg text-tertiary">
						<p>
							Welcome to my digital garden, where I will share my knowledge. Here I write mostly about what I do, or
							did, at my <code>$JOB</code>, and about courses I&#39;m taking.
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
