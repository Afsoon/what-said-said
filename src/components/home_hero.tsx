"use client";
import { TagGroup, TagList } from "react-aria-components";
import type { Selection } from "react-aria-components";
import { Header } from "./header";
import { Tag } from "./ui/tag-group";
import { useState } from "react";
import { ContentCard } from "./content_card";

const sectionList = [
  { id: "full", name: "All content" },
  { id: "post", name: "Blog Post" },
  { id: "til", name: "TIL" },
];

export const HomeHero = () => {
  const [selected, setSelected] = useState<Selection>(new Set(["full"]));

  return (
    <div>
      <Header title="Blog" description="Recent post and TIL" />
      <TagGroup
        aria-label="Categories to filter blog content"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TagList items={sectionList}>{(item) => <Tag>{item.name}</Tag>}</TagList>
      </TagGroup>
      <div className="@container">
        <div className="grid grid-cols-[repeat(1,320px)] gap-6 @[524px]:grid-cols-[repeat(2,320px)] @[798px]:grid-cols-[repeat(3,320px)]">
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
          <ContentCard
            title="Lorem ipsum"
            description="JAJAJAJAJAJAJ JAJAJAJA JAAJAJA"
            date="10 JUL 2025"
            tags={[{ id: "algo", name: "ALGO" }]}
          />
        </div>
      </div>
    </div>
  );
};
