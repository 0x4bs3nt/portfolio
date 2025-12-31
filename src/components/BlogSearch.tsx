import { useState, useMemo } from "react";

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags?: string[];
  };
}

interface BlogSearchProps {
  posts: Post[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const titleMatch = post.data.title.toLowerCase().includes(query);
      const descriptionMatch = post.data.description
        .toLowerCase()
        .includes(query);
      const tagMatch = post.data.tags?.some((tag) =>
        tag.toLowerCase().includes(query),
      );

      return titleMatch || descriptionMatch || tagMatch;
    });
  }, [searchQuery, posts]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="blog-search">
      <div className="search-box">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search posts by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {searchQuery && (
        <p className="search-results-count">
          Found {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "post" : "posts"}
        </p>
      )}

      <div className="posts">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="post-card">
            <time
              className="post-date"
              dateTime={new Date(post.data.date).toISOString()}
            >
              Published on {formatDate(post.data.date)}
            </time>
            <h2 className="post-title">
              <a href={`/blog/${post.slug}`}>{post.data.title}</a>
            </h2>
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="post-tags">
                {post.data.tags.map((tag) => (
                  <a key={tag} href={`/blog/tags/${tag}`} className="tag">
                    [{tag}]
                  </a>
                ))}
              </div>
            )}
            <p className="post-description">{post.data.description}</p>
            <a href={`/blog/${post.slug}`} className="read-more">
              Read more →
            </a>
          </article>
        ))}
      </div>

      {searchQuery && filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No posts found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery("")} className="reset-button">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
