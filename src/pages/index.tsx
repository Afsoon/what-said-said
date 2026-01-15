import { waitUntil } from 'cloudflare:workers'; // eslint-disable-line import/no-unresolved
import { Link } from 'waku';

export default async function HomePage() {

  // Example: invoking waitUntil() on the Cloudflare executionCtx.
  // https://hono.dev/docs/api/context#executionctx
  waitUntil(
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(
          'Cloudflare waitUntil() promise resolved. The server response does not wait for this.',
        );
        resolve();
      }, 1000);
    }),
  );

  return (
    <div>
      <Link to="/blog" className="mt-4 inline-block underline">
        Blog
      </Link>
    </div>
  );
}

// Enable dynamic server rendering.
// Static rendering is possible if you want to render at build time.
// The Hono context will not be available.
export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
