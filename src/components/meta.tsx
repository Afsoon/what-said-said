type MetaProps = {
  title: string;
  description: string;
  slug?: string;
};

export const Meta = ({ title, description, slug }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {slug != null ? (
        <meta property="og:url" content={`https://whatsaidsaid.com/blog/${slug}`} />
      ) : null}

      <link rel="alternate" type="application/rss+xml" title="rss" href="https://waku.gg/rss.xml" />
    </>
  );
};
