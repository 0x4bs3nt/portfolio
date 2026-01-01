import { useState, useMemo, useEffect } from "react";

interface Post {
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags?: string[];
  };
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Read tag from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get("tag");
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, []);

  // Update URL when tag changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedTag) {
      url.searchParams.set("tag", selectedTag);
    } else {
      url.searchParams.delete("tag");
    }
    window.history.replaceState({}, "", url);
  }, [selectedTag]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.data.tags?.includes(selectedTag));
  }, [selectedTag, posts]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTagClick = (tag: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (selectedTag === tag) {
        setSelectedTag(null);
      } else {
        setSelectedTag(tag);
      }
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  return (
    <>
      {allTags.length > 0 && (
        <div className="tags">
          <span className="tags-label">tags:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag ${selectedTag === tag ? "active" : ""}`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => handleTagClick(selectedTag)}
              className="tag clear"
            >
              clear
            </button>
          )}
        </div>
      )}

      {selectedTag && (
        <p className="filter-status">
          Showing {filteredPosts.length}{" "}
          {filteredPosts.length === 1 ? "post" : "posts"} tagged with "
          {selectedTag}"
        </p>
      )}

      <div className={`posts ${isTransitioning ? "transitioning" : ""}`}>
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="post-card"
            onClick={(e) => {
              // Don't navigate if clicking on a tag button
              if ((e.target as HTMLElement).closest(".tag")) {
                return;
              }
              window.location.href = `/blog/${post.slug}`;
            }}
          >
            <div className="post-meta">
              <time
                className="post-date"
                dateTime={new Date(post.data.date).toISOString()}
              >
                {formatDate(post.data.date)}
              </time>
            </div>
            <div className="post-content">
              <h2 className="post-title">{post.data.title}</h2>
              {post.data.tags && post.data.tags.length > 0 && (
                <div className="post-tags">
                  {post.data.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagClick(tag);
                      }}
                      className={`tag ${selectedTag === tag ? "active" : ""}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
              <p className="post-description">{post.data.description}</p>
            </div>
          </article>
        ))}
      </div>

      {selectedTag && filteredPosts.length === 0 && (
        <div className="no-results">
          <p>No posts found with tag "{selectedTag}"</p>
          <button
            onClick={() => handleTagClick(selectedTag)}
            className="clear-button"
          >
            Clear filter
          </button>
        </div>
      )}
    </>
  );
}
