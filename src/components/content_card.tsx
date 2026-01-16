"use client";
import { TagGroup, TagList } from "react-aria-components";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tag } from "./ui/tag-group";

type ContentCardProps = {
  title: string;
  date: string;
  description: string;
  tags: {
    id: string;
    name: string;
  }[];
};

export const ContentCard = ({ title, date, description, tags }: ContentCardProps) => {
  return (
    <Card className="h-50 w-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Published at {date}</CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter>
        <TagGroup selectionMode="none" aria-label={`${title} is categorized as ${tags.join(", ")}`}>
          <TagList items={tags}>{(item) => <Tag>{item.name}</Tag>}</TagList>
        </TagGroup>
      </CardFooter>
    </Card>
  );
};
