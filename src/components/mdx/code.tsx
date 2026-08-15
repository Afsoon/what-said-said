import { Pre, highlight, type RawCode } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
	const highlighted = await highlight(codeblock, "github-dark");

	return (
		<div className="not-prose relative my-4 overflow-hidden rounded-lg border border-[var(--color-border-secondary)]">
			<Pre
				className="m-0 overflow-x-auto p-3 text-sm"
				code={highlighted}
				style={{ background: highlighted.style?.background }}
			/>
		</div>
	);
}
