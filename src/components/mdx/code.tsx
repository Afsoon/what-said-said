import { Pre, type HighlightedCode } from "codehike/code";
import { collapse, collapseContent, collapseTrigger, mark } from "#/components/mdx/annotations";

// codeblock arrives pre-highlighted from the build (syntaxHighlighting in vite.config.ts)
export function Code({ codeblock }: { codeblock: HighlightedCode }) {
	return (
		<div className="not-prose relative my-4 overflow-hidden rounded-lg border border-[var(--color-border-secondary)]">
			<Pre
				className="m-0 overflow-x-auto p-3 text-sm"
				code={codeblock}
				handlers={[mark, collapse, collapseTrigger, collapseContent]}
				style={{ background: codeblock.style?.background }}
			/>
		</div>
	);
}
