import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    projectSlug: z.string(),
    status: z.enum(["Draft content", "Ready"]),
    techStack: z.array(z.string()),
  }),
});

export const collections = {
  "case-studies": caseStudies,
};
