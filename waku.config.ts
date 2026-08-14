import nodeLoaderCloudflare from "@hiogawa/node-loader-cloudflare/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

// Workaround for https://github.com/vitejs/vite/issues/21969 — server builds default
// to rolldown platform "node" and emit an eager `createRequire(import.meta.url)` CJS
// interop shim. On workerd `import.meta.url` is undefined, so the worker crashes at
// startup even though nothing ever calls the shim. Remove once the Vite fix ships.
// Typed structurally because vite is not a direct dependency.
const patchCreateRequireForWorkerd = () => ({
  name: "patch-create-require-for-workerd",
  apply: "build" as const,
  generateBundle(_options: unknown, bundle: Record<string, { type: string; code?: string }>) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === "chunk" && chunk.code?.includes("createRequire(import.meta.url)")) {
        chunk.code = chunk.code.replaceAll(
          "(() => createRequire(import.meta.url))()",
          "(() => { try { return createRequire(import.meta.url); } catch { return undefined; } })()",
        );
      }
    }
  },
});

export default defineConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      patchCreateRequireForWorkerd(),
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),

      nodeLoaderCloudflare({
        environments: ["rsc"],
        build: true,
        // https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
        getPlatformProxyOptions: {
          persist: {
            path: ".wrangler/state/v3",
          },
        },
      }),
    ],
  },
});
