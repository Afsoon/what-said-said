"use client";
import { Header } from "./header";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { ContentCard } from "./content_card";

const SECTIONS_AVAILABLE = {
  ALL: "all",
  BLOG: "blog",
  TIL: "til",
} as const;

export type ArticleItem = {
  type: typeof SECTIONS_AVAILABLE.BLOG | typeof SECTIONS_AVAILABLE.TIL;
  url: string;
  title: string;
  description: string;
  date: string;
  tags: { id: string; name: string }[];
};

type HomeHeroProps = {
  allArticles: Array<ArticleItem>;
  blogArticles: Array<ArticleItem>;
  tilArticles: Array<ArticleItem>;
};

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @[524px]:grid-cols-2 @[798px]:grid-cols-3">
        {children}
      </div>
    </div>
  );
};

export const HomeHero = ({ allArticles, blogArticles, tilArticles }: HomeHeroProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Header title="Blog" description="Recent post and TIL" />
      <Tabs aria-label="Categories to filter blog content">
        <TabList>
          <Tab id={SECTIONS_AVAILABLE.ALL}>All articles</Tab>
          <Tab id={SECTIONS_AVAILABLE.BLOG}>Blog articles</Tab>
          <Tab id={SECTIONS_AVAILABLE.TIL}>TIL</Tab>
        </TabList>
        <TabPanel id={SECTIONS_AVAILABLE.ALL}>
          <GridContainer>
            {allArticles.map((article) => (
              <ContentCard
                key={article.url}
                href={article.url}
                type={article.type}
                title={article.title}
                description={article.description}
                date={article.date}
                tags={article.tags}
              />
            ))}
          </GridContainer>
        </TabPanel>
        <TabPanel id={SECTIONS_AVAILABLE.BLOG}>
          <GridContainer>
            {blogArticles.map((article) => (
              <ContentCard
                key={article.url}
                href={article.url}
                type={article.type}
                title={article.title}
                description={article.description}
                date={article.date}
                tags={article.tags}
              />
            ))}
          </GridContainer>
        </TabPanel>
        <TabPanel id={SECTIONS_AVAILABLE.TIL}>
          <GridContainer>
            {tilArticles.map((article) => (
              <ContentCard
                key={article.url}
                href={article.url}
                type={article.type}
                title={article.title}
                description={article.description}
                date={article.date}
                tags={article.tags}
              />
            ))}
          </GridContainer>
        </TabPanel>
      </Tabs>
    </div>
  );
};
