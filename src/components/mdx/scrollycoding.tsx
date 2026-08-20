import type { HighlightedCode } from "codehike/code";
import { any, array, looseObject, object, optional, parse, string } from "valibot";
import { ScrollyCodePanel, Selectable, SelectionProvider, StepCode } from "#/components/mdx/scrolly-client";

// remarkCodeHike/recmaCodeHike (see vite.config.ts) compile the `## !!steps`
// sections inside a <Scrollycoding> block into these props at build time, so no
// runtime block parsing (codehike/blocks pulls in zod, which we don't ship).
// The code is also pre-highlighted at build time (syntaxHighlighting config) —
// looseObject keeps the token/annotation fields a strict object() would strip.
const ScrollycodingSchema = object({
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
	const { children, steps } = parse(ScrollycodingSchema, props);
	const highlighted = steps.map((step) => step.code as unknown as HighlightedCode);

	// Step prose must not contain h2-h4 headings: it renders in both layouts, so
	// the anchor ids from components.tsx would be duplicated.
	return (
		<section className="not-prose my-8 md:my-12 lg:relative lg:left-1/2 lg:w-[min(100vw-4rem,76rem)] lg:-translate-x-1/2">
			{children ? <div className="mb-10 flex flex-col gap-3 text-md text-tertiary">{children}</div> : null}

			{/* <lg: steps stacked, each step's code inline below it */}
			<div className="flex flex-col gap-10 lg:hidden">
				{steps.map((step, i) => (
					<div key={`${i}-${step.title}`}>
						<h3 className="text-lg font-semibold text-primary">{step.title}</h3>
						<div className="mt-2 flex flex-col gap-3 text-md text-tertiary">{step.children}</div>
						<div className="mt-4">
							<StepCode code={highlighted[i]} />
						</div>
					</div>
				))}
			</div>

			{/* lg+: scroll-linked steps on the left, sticky morphing code panel on the right */}
			<SelectionProvider className="relative hidden lg:flex lg:gap-12">
				<div className="flex w-[42%] flex-col gap-6 py-4 pb-[30vh]">
					{steps.map((step, i) => (
						<Selectable
							key={`${i}-${step.title}`}
							index={i}
							selectOn={["click", "scroll"]}
							className="min-h-64 cursor-pointer rounded-xl border border-secondary bg-primary p-6 transition duration-200 data-[selected=true]:border-brand-300 data-[selected=true]:bg-brand-primary data-[selected=true]:shadow-md"
						>
							<h3 className="text-lg font-semibold text-primary">{step.title}</h3>
							<div className="mt-2 flex flex-col gap-3 text-md text-tertiary">{step.children}</div>
						</Selectable>
					))}
				</div>
				<div className="w-[58%]">
					<div className="sticky top-6">
						<ScrollyCodePanel codes={highlighted} />
					</div>
				</div>
			</SelectionProvider>
		</section>
	);
}
