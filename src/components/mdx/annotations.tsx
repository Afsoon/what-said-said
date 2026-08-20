import type { CSSProperties, ReactNode } from "react";
import { InnerLine, type AnnotationHandler } from "codehike/code";
import { FileIcon } from "#/components/mdx/file-icon";
import { cx } from "#/utils/cx";

export const mark: AnnotationHandler = {
	name: "mark",
	Line: ({ annotation, ...props }) => (
		<div className={cx("flex border-l-2", annotation ? "border-brand-400 bg-brand-400/15" : "border-transparent")}>
			<InnerLine merge={props} className="flex-1 px-2" />
		</div>
	),
};

export const lineNumbers: AnnotationHandler = {
	name: "line-numbers",
	Line: (props) => {
		const width = props.totalLines.toString().length + 1;
		return (
			<>
				<span className="text-right opacity-40 select-none" style={{ minWidth: `${width}ch` }}>
					{props.lineNumber}
				</span>
				<InnerLine merge={props} />
			</>
		);
	},
};

// Chrome shared by every code panel; stays github-dark on both themes, so the
// header text/borders use alpha-white instead of the semantic text tokens.
export function CodeFrame({
	title,
	actions,
	style,
	children,
}: {
	title?: string;
	actions?: ReactNode;
	style?: CSSProperties;
	children: ReactNode;
}) {
	return (
		<div className="overflow-hidden rounded-lg border border-secondary shadow-xs" style={style}>
			<div className="flex items-center justify-between gap-2 border-b border-alpha-white/10 px-4 py-2">
				<span className="flex min-w-0 items-center font-mono text-xs text-alpha-white/60">
					<FileIcon filename={title || "code"} />
					<span className="truncate">{title || "code"}</span>
				</span>
				{actions}
			</div>
			{children}
		</div>
	);
}
