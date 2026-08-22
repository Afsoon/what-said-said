import type { CSSProperties, ReactNode } from "react";
import { ChevronDown } from "@untitledui/icons";
import { InnerLine, type AnnotationHandler, type BlockAnnotation } from "codehike/code";
import { FileIcon } from "#/components/mdx/file-icon";
import { Button, Disclosure, DisclosurePanel } from "#/components/mdx/rac-client";
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

// `!collapse(N:M)` folds a code region behind its first line; append ` collapsed`
// to start folded. Port of codehike's collapse recipe onto react-aria Disclosure.
export const collapse: AnnotationHandler = {
	name: "collapse",
	transform: (annotation: BlockAnnotation) => {
		const { fromLineNumber } = annotation;
		return [
			annotation,
			{ ...annotation, fromLineNumber, toLineNumber: fromLineNumber, name: "CollapseTrigger" },
			{ ...annotation, fromLineNumber: fromLineNumber + 1, name: "CollapseContent" },
		];
	},
	Block: ({ annotation, children }) => (
		<Disclosure defaultExpanded={annotation.query !== "collapsed"} className="group/collapse">
			{children}
		</Disclosure>
	),
};

export const collapseTrigger: AnnotationHandler = {
	name: "CollapseTrigger",
	onlyIfAnnotated: true,
	AnnotatedLine: ({ annotation: _annotation, ...props }) => (
		<Button slot="trigger" className="block w-full cursor-pointer text-left">
			<InnerLine
				merge={props}
				data={{
					icon: (
						<ChevronDown
							aria-hidden
							className="size-3.5 shrink-0 -rotate-90 text-alpha-white/60 transition-transform group-data-expanded/collapse:rotate-0"
						/>
					),
				}}
			/>
		</Button>
	),
	Line: (props) => {
		const icon = props.data?.icon as ReactNode;
		return (
			<div className="flex items-center">
				{icon}
				<InnerLine merge={props} className="min-w-0 flex-1" />
			</div>
		);
	},
};

export const collapseContent: AnnotationHandler = {
	name: "CollapseContent",
	Block: ({ children }) => <DisclosurePanel>{children}</DisclosurePanel>,
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
