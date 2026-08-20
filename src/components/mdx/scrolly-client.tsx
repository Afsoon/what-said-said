"use client";

import { Component } from "react";
import { Check, Copy01 } from "@untitledui/icons";
import {
	getPreRef,
	InnerPre,
	Pre,
	type AnnotationHandler,
	type CustomPreProps,
	type HighlightedCode,
} from "codehike/code";
import { useSelectedIndex } from "codehike/utils/selection";
import {
	calculateTransitions,
	getStartingSnapshot,
	type TokenTransitionsSnapshot,
} from "codehike/utils/token-transitions";
import { CodeFrame, lineNumbers, mark } from "#/components/mdx/annotations";
import { useClipboard } from "#/hooks/use-clipboard";

export { Selectable, SelectionProvider } from "codehike/utils/selection";

const MAX_TRANSITION_DURATION = 900; // ms

// Code Hike's token-transitions recipe: snapshot token positions before an
// update, then FLIP-animate them to their new places.
class SmoothPre extends Component<CustomPreProps> {
	ref: ReturnType<typeof getPreRef>;

	constructor(props: CustomPreProps) {
		super(props);
		this.ref = getPreRef(this.props);
	}

	render() {
		return <InnerPre merge={this.props} style={{ position: "relative" }} />;
	}

	getSnapshotBeforeUpdate() {
		return getStartingSnapshot(this.ref.current as HTMLPreElement);
	}

	componentDidUpdate(_prevProps: CustomPreProps, _prevState: unknown, snapshot: TokenTransitionsSnapshot) {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}
		const transitions = calculateTransitions(this.ref.current as HTMLPreElement, snapshot);
		for (const { element, keyframes, options } of transitions) {
			const { translateX, translateY, ...frames } = keyframes;
			const keyframe: PropertyIndexedKeyframes = { ...frames };
			if (translateX && translateY) {
				keyframe.translate = [`${translateX[0]}px ${translateY[0]}px`, `${translateX[1]}px ${translateY[1]}px`];
			}
			element.animate(keyframe, {
				duration: options.duration * MAX_TRANSITION_DURATION,
				delay: options.delay * MAX_TRANSITION_DURATION,
				easing: options.easing,
				fill: "both",
			});
		}
	}
}

const tokenTransitions: AnnotationHandler = {
	name: "token-transitions",
	PreWithRef: SmoothPre,
	Token: ({ value, style }) => <span style={{ ...style, display: "inline-block" }}>{value}</span>,
};

function CopyButton({ text }: { text: string }) {
	const { copied, copy } = useClipboard();

	return (
		<button
			type="button"
			aria-label="Copy code"
			onClick={() => copy(text)}
			className="cursor-pointer rounded-md p-1 text-alpha-white/60 transition outline-focus-ring hover:text-alpha-white/90 focus-visible:outline-2"
		>
			{copied ? <Check className="size-4" /> : <Copy01 className="size-4" />}
		</button>
	);
}

// Desktop sticky panel: a single <Pre> that swaps to the selected step's code,
// letting token-transitions morph between steps (a <Selection> subtree swap
// would remount and kill the animation).
export function ScrollyCodePanel({ codes }: { codes: HighlightedCode[] }) {
	const [selectedIndex] = useSelectedIndex();
	const code = codes[selectedIndex] ?? codes[0];

	if (!code) {
		return null;
	}

	return (
		<CodeFrame
			title={code.meta}
			actions={<CopyButton text={code.code} />}
			style={{ background: code.style?.background }}
		>
			<Pre
				code={code}
				handlers={[tokenTransitions, mark, lineNumbers]}
				className="m-0 max-h-[calc(100vh-8rem)] overflow-auto p-4 font-mono text-sm"
			/>
		</CodeFrame>
	);
}

// Inline (mobile) code block. A client component on purpose: the token data
// crosses the RSC boundary once as compact JSON (deduped with the panel's
// `codes` prop) instead of as a serialized element tree — and it still
// server-renders to HTML like any client component.
export function StepCode({ code }: { code: HighlightedCode }) {
	return (
		<CodeFrame
			title={code.meta}
			actions={<CopyButton text={code.code} />}
			style={{ background: code.style?.background }}
		>
			<Pre code={code} handlers={[mark, lineNumbers]} className="m-0 overflow-x-auto p-4 font-mono text-sm" />
		</CodeFrame>
	);
}
