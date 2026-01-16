"use client";
import { RouterProvider, I18nProvider } from "react-aria-components";
import { useRouter } from "waku";
import { Unstable_InferredPaths } from "waku/router/client";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <RouterProvider
      navigate={(path: Unstable_InferredPaths | (string & {})) =>
        router.push(path as Unstable_InferredPaths)
      }
    >
      <I18nProvider locale="en-US">{children}</I18nProvider>
    </RouterProvider>
  );
}
