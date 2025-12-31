/**
 * Calculate reading time for blog posts
 * Assumes average reading speed of 200 words per minute
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}

/**
 * Extract headings from markdown content for table of contents
 */
export interface TocItem {
  text: string;
  slug: string;
  depth: number;
}

export function getTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ text, slug, depth });
  }

  return headings;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Get all unique tags from blog posts
 */
export function getAllTags(posts: any[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach((tag: string) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}
