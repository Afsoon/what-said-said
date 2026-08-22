import type { HighlightedCode } from "codehike/code";
import { any, array, looseObject, object, optional, parse, string } from "valibot";
import { ScrollyCodePanel, Selectable, SelectionProvider, StepCode } from "#/components/mdx/scrolly-client";
import { getAnchor } from "#/utils/get-anchor";

// remarkCodeHike/recmaCodeHike (see vite.config.ts) compile the `## !!steps`
// sections inside a <Scrollycoding> block into these props at build time, so no
// runtime block parsing (codehike/blocks pulls in zod, which we don't ship).
// The code is also pre-highlighted at build time (syntaxHighlighting config) —
// looseObject keeps the token/annotation fields a strict object() would strip.
const ScrollycodingSchema = object({
	// section title, set by the author: <Scrollycoding title="...">
	title: optional(string(), ""),
	children: optional(any()),
	steps: array(
		object({
			title: optional(string(), ""),
			children: optional(any()),
			code: looseObject({
				code: string(),
				lang: string(),
				meta: optional(string(), ""),
			}),
		}),
	),
});

export function Scrollycoding(props: unknown) {
	const { title, children, steps } = parse(ScrollycodingSchema, props);
	const highlighted = steps.map((step) => step.code as unknown as HighlightedCode);

	// Step prose must not contain h2-h4 headings: it renders in both layouts, so
	// the anchor ids from components.tsx would be duplicated.
	return (
		<section className="not-prose my-8 md:my-12 lg:relative lg:left-1/2 lg:w-[min(100vw-4rem,76rem)] lg:-translate-x-1/2">
			{/* Header sits outside both layouts so the section counter increments exactly once */}
			{title ? (
				<header id={getAnchor(title)} className="mb-10 scroll-mt-16">
					<p aria-hidden className="scrolly-kicker text-sm font-semibold text-brand-secondary" />
					<h2 className="mt-2 text-display-xs font-semibold text-primary md:text-display-sm">{title}</h2>
				</header>
			) : null}
			{/* Section description: prose between the opening tag and the first `## !!steps`.
			    Note: we're inside not-prose, so typography.css inline-code styling doesn't apply here. */}
			{children ? (
				<div className="scrolly-prose mb-10 flex max-w-180 flex-col gap-3 text-lg text-tertiary">{children}</div>
			) : null}

			{/* <lg: steps stacked, each step's code inline below it */}
			<div className="flex flex-col gap-10 lg:hidden">
				{steps.map((step, i) => (
					<div key={`${i}-${step.title}`} className="min-w-0">
						<div className="flex items-start gap-3">
							<StepNumber n={i + 1} />
							<div className="min-w-0">
								<h3 className="text-lg font-semibold text-primary">{step.title}</h3>
								<div className="scrolly-prose mt-2 flex flex-col gap-3 text-md text-tertiary">{step.children}</div>
							</div>
						</div>
						<div className="mt-4">
							<StepCode code={highlighted[i]} />
						</div>
					</div>
				))}
			</div>

			{/* lg+: scroll-linked steps on the left, sticky morphing code panel on the right */}
			<SelectionProvider className="relative hidden lg:flex lg:gap-12">
				<div className="flex w-[42%] flex-col gap-6 ">
					{steps.map((step, i) => (
						<Selectable
							key={`${i}-${step.title}`}
							index={i}
							selectOn={["click", "scroll"]}
							className="min-h-64 cursor-pointer rounded-xl border border-secondary bg-primary p-6 transition duration-200 data-[selected=true]:border-brand-300 data-[selected=true]:bg-brand-primary data-[selected=true]:shadow-md"
						>
							<div className="flex items-start gap-3">
								<StepNumber n={i + 1} />
								<div className="min-w-0">
									<h3 className="text-lg font-semibold text-primary">{step.title}</h3>
									<div className="scrolly-prose mt-2 flex flex-col gap-3 text-md text-tertiary">{step.children}</div>
								</div>
							</div>
						</Selectable>
					))}
				</div>
				<div className="w-[58%] min-w-0">
					<div className="sticky top-6">
						<ScrollyCodePanel codes={highlighted} />
					</div>
				</div>
			</SelectionProvider>
		</section>
	);
}

function StepNumber({ n }: { n: number }) {
	return (
		<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-solid text-sm font-semibold text-white">
			{n}
		</span>
	);
}
