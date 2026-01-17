import { readdirSync } from "node:fs";

export const getFileName = async (folder: string, slug: string) => {
  let foundFileName = undefined;
  readdirSync(folder).forEach((fileName) => {
    if (fileName.endsWith(".mdx") && fileName.substring(0, fileName.length - 4) === slug) {
      foundFileName = fileName;
    }
  });

  return foundFileName;
};

export const getPostPaths = async (folder: string) => {
  const blogPaths: Array<string> = [];
  const blogFileNames: Array<string> = [];

  readdirSync(folder).forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogPaths.push(fileName.substring(0, fileName.length - 4));
      blogFileNames.push(fileName);
    }
  });

  return blogPaths;
};
