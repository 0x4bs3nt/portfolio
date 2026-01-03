# Personal Portfolio & Blog

A modern, fast, and elegant personal portfolio website with a fully-featured blog built with Astro.

## Features

### Design

- Clean, minimalist aesthetic with refined typography
- Newsreader serif headings + DM Sans body text
- Smooth animations and transitions
- Fully responsive design
- Subtle background textures

### Blog Features

- **Content Collections** - Write posts as Markdown files
- **Syntax Highlighting** - Powered by Shiki (VS Code's highlighter)
- **Reading Time** - Automatic calculation
- **Table of Contents** - Auto-generated from headings
- **Search** - Real-time client-side search by title, description, or tags
- **Tag Filtering** - Browse posts by topic
- **RSS Feed** - Syndication support at `/rss.xml`
- **SEO Optimized** - Complete meta tags (Open Graph, Twitter Cards)

### Performance

- Zero JavaScript by default (Islands Architecture)
- Optimized builds
- Fast page loads

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The site will be available at `http://localhost:4321`

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── BlogSearch.tsx        # Client-side search
│   │   ├── BlogSearch.css
│   │   └── TableOfContents.astro
│   ├── content/         # Content Collections
│   │   ├── config.ts    # Schema definitions
│   │   └── blog/        # Blog posts (markdown)
│   ├── layouts/
│   │   └── Layout.astro # Base layout with SEO
│   ├── pages/
│   │   ├── index.astro  # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   ├── [slug].astro      # Individual posts
│   │   │   └── tags/[tag].astro  # Tag filtering
│   │   └── rss.xml.js   # RSS feed
│   └── utils/
│       └── blog.ts      # Utility functions
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Writing Blog Posts

### Creating a New Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: 2025-01-31
tags: ["astro", "web development"]
draft: false
---

# Your Post Title

Your content here...

## Section Heading

More content...
```

### Frontmatter Fields

| Field         | Type    | Required | Description                           |
| ------------- | ------- | -------- | ------------------------------------- |
| `title`       | string  | ✅       | Post title                            |
| `description` | string  | ✅       | Post description (used in SEO)        |
| `date`        | date    | ✅       | Publish date (YYYY-MM-DD)             |
| `tags`        | array   | ❌       | Array of tags                         |
| `draft`       | boolean | ❌       | Set to `true` to hide from production |

### Markdown Features

- **Headings** - H1-H6 support
- **Code blocks** - With syntax highlighting
- **Lists** - Ordered and unordered
- **Links** - Internal and external
- **Images** - Markdown image syntax
- **Blockquotes** - For callouts

### Code Blocks

Use triple backticks with language identifier:

\`\`\`javascript
function hello() {
console.log("Hello, world!");
}
\`\`\`

## Customization

### Updating Personal Information

**Homepage** (`src/pages/index.astro:18`)

- Replace `"Your Name"` with your actual name
- Update the subtitle and about text

**Site Metadata** (`src/layouts/Layout.astro:12-13`)

- Update default title and description

### Color Scheme

Edit CSS variables in `src/layouts/Layout.astro:72-77`:

```css
:root {
  --color-bg: #fafaf9;
  --color-text: #1c1917;
  --color-text-muted: #57534e;
  --color-accent: #0c4a6e;
  --color-border: #e7e5e4;
}
```

### Fonts

Change font imports in `src/layouts/Layout.astro:61-63` and update CSS variables:

```css
--font-serif: "Newsreader", Georgia, serif;
--font-sans: "DM Sans", system-ui, sans-serif;
```

### Syntax Highlighting Theme

Edit `astro.config.mjs:10` to change the code theme:

```javascript
shikiConfig: {
  theme: 'github-dark', // or 'nord', 'dracula', 'monokai', etc.
  wrap: true
}
```

[See all available themes](https://shiki.style/themes)

## Production Setup

### 1. Configure Site URL

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://yourdomain.com", // Add this line
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
});
```

This is **required** for:

- Proper RSS feed URLs
- Correct canonical URLs
- Social media meta tags

### 2. Add Open Graph Image (Optional)

Create a social sharing image:

- Add `og-image.jpg` (1200x630px) to `public/` folder
- Or update the default in `src/layouts/Layout.astro:14`

### 3. Update Contact Page

Create `src/pages/contact.astro` with your contact information or link to your preferred contact method.

### 4. Build for Production

```bash
npm run build
# or
bun run build
```

This creates a `dist/` folder with optimized static files.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - `SITE_URL`: `https://yourdomain.com`
5. Deploy!

### Netlify

1. Push code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Deploy!

### Cloudflare Pages

1. Push code to GitHub
2. Create new Pages project in [Cloudflare](https://pages.cloudflare.com)
3. Build settings:
   - Build Command: `npm run build`
   - Build Output: `dist`
4. Deploy!

### Other Platforms

Astro works with any static hosting:

- GitHub Pages
- AWS S3 + CloudFront
- DigitalOcean App Platform
- Railway
- Render

See [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for platform-specific guides.

## Available Commands

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `dist/`     |
| `npm run preview` | Preview production build locally     |
| `npm run astro`   | Run Astro CLI commands               |

## Environment Variables (Optional)

Create a `.env` file for local overrides:

```bash
# Optional: Override site URL in development
PUBLIC_SITE_URL=http://localhost:4321
```

## SEO Checklist

Before deploying:

- [ ] Set `site` URL in `astro.config.mjs`
- [ ] Update homepage name and bio
- [ ] Add `og-image.jpg` to `public/` folder
- [ ] Update RSS feed title in `src/pages/rss.xml.js:13`
- [ ] Create `public/robots.txt` if needed
- [ ] Add `public/favicon.svg` or `.ico`

## Performance Tips

1. **Optimize Images** - Use WebP format and add to `public/`
2. **Lazy Load** - Use `loading="lazy"` on images
3. **Minimize JavaScript** - Keep interactive components small
4. **Use CDN** - Deploy to platforms with global CDN (Vercel, Cloudflare)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tech Stack

- [Astro](https://astro.build) - Web framework
- [React](https://react.dev) - For search component
- [Shiki](https://shiki.style) - Syntax highlighting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## License

MIT - Feel free to use this template for your own portfolio!

## Support

For Astro-specific questions, see the [Astro documentation](https://docs.astro.build).

---

Built with Astro
