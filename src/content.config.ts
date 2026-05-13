import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const entrySchema = z
  .object({
    title: z.string().optional(),
    collection: z.string().optional(),
    permalink: z.string().optional(),
    date: z.coerce.date().optional(),
    type: z.string().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.string().optional(),
    paperurl: z.string().optional(),
    slidesurl: z.string().optional(),
    citation: z.string().optional(),
    company: z.string().optional(),
    date_start: z.string().optional(),
    date_end: z.string().optional(),
    redirect_from: z.any().optional(),
  })
  .passthrough();

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

const talks = defineCollection({
  loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: entrySchema,
});

export const collections = {
  pages,
  publications,
  talks,
  education,
  work,
  posts,
};
