import { ClientProviders } from '../components/client_providers';
import '../styles.css';

import type { ReactNode } from 'react';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>What Said Said</title>
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
			</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
