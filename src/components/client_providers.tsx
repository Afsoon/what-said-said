"use client";
import { RouterProvider, I18nProvider } from "react-aria-components";
import { useRouter } from "waku";

type RouterPushHref = Parameters<ReturnType<typeof useRouter>["push"]>[0];

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  let router = useRouter();

  return (
    <RouterProvider
      navigate={(path: RouterPushHref | (string & {})) => router.push(path as RouterPushHref)}
    >
      <I18nProvider locale="en-US">{children}</I18nProvider>
    </RouterProvider>
  );
}
