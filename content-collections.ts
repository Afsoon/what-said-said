import { defineCollection, defineConfig } from "@content-collections/core";
import * as v from "valibot";

const jobs = defineCollection({
  name: "jobs",
  directory: "content/jobs",
  include: "**/*.md",
  schema: v.object({
    jobTitle: v.string(),
    summary: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    company: v.string(),
    location: v.string(),
    tags: v.array(v.string()),
    content: v.string(),
  }),
});

const education = defineCollection({
  name: "education",
  directory: "content/education",
  include: "**/*.md",
  schema: v.object({
    school: v.string(),
    summary: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    tags: v.array(v.string()),
    content: v.string(),
  }),
});

export default defineConfig({
  content: [jobs, education],
});
