"use client";

// react-aria-components ships no "use client" directive of its own, so the rsc
// environment (code.tsx renders there) needs this first-party client boundary.
export { Button, Disclosure, DisclosurePanel } from "react-aria-components";
