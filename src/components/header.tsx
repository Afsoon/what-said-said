"use client";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

export const Header = ({ title, description }: { title: string; description: string }) => {
  return (
    <>
      <Heading level={1}>{title}</Heading>
      <Text>{description}</Text>
    </>
  );
};
