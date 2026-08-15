"use client";
import { createLink } from "@tanstack/react-router";
import { Link as RACLink, type LinkProps as AriaLinkProps } from "react-aria-components";
import { cx, sortCx } from "#/utils/cx";

const styles = sortCx({
	common: {
		root: [
			"group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2",
			// When button is used within `InputGroup`
			"in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none",
			// Disabled styles
			"disabled:cursor-not-allowed disabled:opacity-50 in-data-input-wrapper:disabled:opacity-100",
			// Same as `icon` but for SSR icons that cannot be passed to the client as functions.
			"*:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all",
		].join(" "),
	},
	sizes: {
		xs: {
			root: [
				"gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
				"in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5",
				"*:data-icon:size-4 *:data-icon:stroke-[2.25px]",
			].join(" "),
			linkRoot: "gap-1 underline-offset-3",
		},
		sm: {
			root: [
				"gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
				"in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5",
			].join(" "),
			linkRoot: "gap-1 underline-offset-3",
		},
		md: {
			root: [
				"gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5",
				"in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3",
			].join(" "),
			linkRoot: "gap-1 underline-offset-4",
		},
		lg: {
			root: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3",
			linkRoot: "gap-1.5 underline-offset-4",
		},
		xl: {
			root: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-3.5",
			linkRoot: "gap-1.5 underline-offset-4",
		},
	},

	colors: {
		base: {
			root: [
				"justify-normal rounded p-0! text-brand-secondary hover:text-brand-secondary_hover",
				// Inner text underline
				"underline decoration-transparent hover:decoration-fg-brand-secondary_alt",
			].join(" "),
		},
		gray: {
			root: [
				"justify-normal rounded p-0! text-tertiary hover:text-tertiary_hover",
				// Inner text underline
				"underline decoration-transparent hover:decoration-fg-quaternary",
			].join(" "),
		},
		destructive: {
			root: [
				"justify-normal rounded p-0! text-error-primary outline-error hover:text-error-primary_hover",
				// Inner text underline
				"underline decoration-transparent underline-offset-2 hover:decoration-current",
			].join(" "),
		},
	},
});

interface StyledLinkProps extends AriaLinkProps {
	size?: keyof typeof styles.sizes;
	color?: keyof typeof styles.colors;
	disabled?: boolean;
	className?: string;
}

function StyledLink({ size = "sm", color = "base", disabled, className, ...props }: StyledLinkProps) {
	return (
		<RACLink
			{...props}
			className={cx(
				styles.common.root,
				styles.sizes[size].root,
				styles.colors[color].root,

				disabled && "pointer-events-none",
				className,
			)}
		/>
	);
}

export const Link = createLink(StyledLink);
