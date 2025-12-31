---
title: "Content Collections Explained"
description: "How Astro's Content Collections work and why they're perfect for blogs."
date: 2025-01-25
tags: ["astro", "content collections", "markdown"]
---

# Content Collections Explained

Astro's Content Collections are a game-changer for managing markdown content. Let me show you how they work.

## What Are Content Collections?

Content Collections provide:

- **Type-safe frontmatter** - Define schemas with Zod
- **Automatic routing** - No manual page creation needed
- **Performance** - Content is processed at build time
- **Developer experience** - Full TypeScript support

## Setting Up a Collection

First, define your schema in `src/content/config.ts`:

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { blog };
```

## Querying Your Content

Then query your posts in any Astro page:

```astro
---
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
---
```

It's that simple! Astro handles all the heavy lifting of parsing markdown, validating frontmatter, and making your content easily queryable.

## Why I Love This Approach

No database needed. No CMS complexity. Just write markdown files, commit them to git, and deploy. Perfect for a personal blog or documentation site.
