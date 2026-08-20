import { Pre, type HighlightedCode } from "codehike/code";

// codeblock arrives pre-highlighted from the build (syntaxHighlighting in vite.config.ts)
export function Code({ codeblock }: { codeblock: HighlightedCode }) {
	return (
		<div className="not-prose relative my-4 overflow-hidden rounded-lg border border-[var(--color-border-secondary)]">
			<Pre
				className="m-0 overflow-x-auto p-3 text-sm"
				code={codeblock}
				style={{ background: codeblock.style?.background }}
			/>
		</div>
	);
}
