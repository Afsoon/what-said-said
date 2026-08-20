import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import rsc from "@vitejs/plugin-rsc";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { recmaCodeHike, remarkCodeHike, type CodeHikeConfig } from "codehike/mdx";

const chConfig: CodeHikeConfig = {
	components: { code: "Code" },
	// highlight at MDX compile time so no request pays for it (workerd included)
	syntaxHighlighting: { theme: "github-dark" },
};

const config = defineConfig({
	resolve: {
		tsconfigPaths: true,
		alias: {
			"~content": fileURLToPath(new URL("./content", import.meta.url)),
		},
	},
	plugins: [
		devtools({
			injectSource: {
				enabled: true,
				// codehike's Inner* components merge sibling props and throw on
				// unknown injected props like data-tsd-source
				ignore: { files: [/src[\\/]components[\\/]mdx[\\/]/] },
			},
		}),
		{
			enforce: "pre",
			...mdx({
				remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, [remarkCodeHike, chConfig]],
				recmaPlugins: [[recmaCodeHike, chConfig]],
			}),
		},
		cloudflare({ viteEnvironment: { name: "ssr", childEnvironments: ["rsc"] } }),
		{
			...contentCollections({
				environment: "ssr",
			}),
			// Vite dev only fires `buildStart` for the client env by default;
			// this flag makes it fire for the ssr env too so the initial build runs.
			perEnvironmentStartEndDuringDev: true,
		},
		tailwindcss(),
		tanstackStart({
			rsc: {
				enabled: true,
			},
		}),
		rsc(),
		viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
	],
});

export default config;
