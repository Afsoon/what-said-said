import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { Code } from "#/components/mdx/code";
import { getAnchor } from "#/utils/get-anchor";

// Body styling comes from the `.prose` rules in src/styles/typography.css —
// this map only adds what prose can't: codehike blocks and heading anchors.
export const components: MDXComponents = {
	Code,
	h2: ({ children, ...rest }: ComponentProps<"h2">) => {
		const id = getAnchor(children);
		return (
			<h2 id={id} className="scroll-mt-16" {...rest}>
				<a href={`#${id}`}>{children}</a>
			</h2>
		);
	},
	h3: ({ children, ...rest }: ComponentProps<"h3">) => {
		const id = getAnchor(children);
		return (
			<h3 id={id} className="scroll-mt-16" {...rest}>
				<a href={`#${id}`}>{children}</a>
			</h3>
		);
	},
	h4: ({ children, ...rest }: ComponentProps<"h4">) => {
		const id = getAnchor(children);
		return (
			<h4 id={id} className="scroll-mt-16" {...rest}>
				<a href={`#${id}`}>{children}</a>
			</h4>
		);
	},
	a: ({ href, children, ...rest }: ComponentProps<"a">) => {
		const isInternal = href?.startsWith("/");
		return (
			<a href={href} {...(isInternal ? {} : { target: "_blank", rel: "noreferrer" })} {...rest}>
				{children}
			</a>
		);
	},
};
