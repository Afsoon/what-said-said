"use client";
import { TagGroup, TagList } from "react-aria-components";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tag } from "./ui/tag-group";
import { Badge } from "./ui/badge";
import type { ArticleItem } from "./home_hero";
import { Heading } from "./ui/heading";
import { ClientLink } from "./link";
import { Text } from "./ui/text";

type ContentCardProps = {
  type: ArticleItem["type"];
  href: string;
  title: string;
  date: string;
  description: string;
  tags: {
    id: string;
    name: string;
  }[];
};

export const ContentCard = ({ type, href, title, date, description, tags }: ContentCardProps) => {
  return (
    <ClientLink
      className="hover:ring-primary duration-300 ease-in-out hover:-translate-y-2 hover:rounded-lg hover:shadow-xl hover:ring-2 hover:ring-offset-2 motion-safe:transition-all"
      href={href}
      aria-label={`Read ${title} article`}
    >
      <Card className="relative h-full px-0.5">
        <CardHeader>
          <CardTitle className="flex content-center items-center gap-1.5 space-y-1">
            <Badge intent={type}>{type.toUpperCase()}</Badge>
            <Heading level={2} className="align-top">
              {title}
            </Heading>
          </CardTitle>
          <CardDescription>Published at {date}</CardDescription>
        </CardHeader>
        <CardContent className="line-clamp-2 h-full max-h-15">
          <Text>{description}</Text>
        </CardContent>
        <CardFooter className="mt-auto">
          <TagGroup
            selectionMode="none"
            aria-label={`${title} is categorized as ${tags.join(", ")}`}
          >
            <TagList className="flex gap-1" items={tags}>
              {(item) => <Tag>{item.name}</Tag>}
            </TagList>
          </TagGroup>
        </CardFooter>
      </Card>
    </ClientLink>
  );
};
