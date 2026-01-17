type MetaProps = {
  title: string;
  description: string;
  path?: string;
};

export const Meta = ({ title, description, path }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {path != null ? (
        <meta property="og:url" content={`https://whatsaidsaid.com/${path}`} />
      ) : null}

      <link rel="alternate" type="application/rss+xml" title="rss" href="https://waku.gg/rss.xml" />
    </>
  );
};
