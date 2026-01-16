import { AppNavbar } from "@/components/app_navbar";
import { ClientProviders } from "@/components/client_providers";
import { Container } from "@/components/ui/container";
import "@/styles.css";

import type { ReactNode } from "react";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>What Said Said</title>
      </head>
      <body className="bg-gray-400">
        <ClientProviders>
          <AppNavbar />
          <Container constrained className="bg-white">
            {children}
          </Container>
        </ClientProviders>
      </body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
