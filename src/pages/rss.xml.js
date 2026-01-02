import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

// TODO: Check blog list design iterations
// TODO: 404 page
// TODO: sitemap
// TODO: robots.txt
// TODO: favicon
// TODO: mobile responsiveness
// TODO: check seo
// TODO: check performance & lighthouse

export async function GET(context) {
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Your Portfolio Blog",
    description: "Thoughts, tutorials, and musings on web development.",
    site: context.site || "https://yoursite.com",
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
