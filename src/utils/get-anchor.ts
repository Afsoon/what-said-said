import slugify from "@sindresorhus/slugify";

export const getAnchor = (value: unknown) => (typeof value === "string" ? slugify(value) : "");
