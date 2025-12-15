"use client";

import BlogHeader from "@/components/blog-header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";
import API from "@/lib/api";
import { Post } from "@/lib/api";

const BlogPageClient = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await API.getAllPosts();
        setAllPosts(data);
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (!allPosts.length) return;

    const selectedSlug = selectedCategory
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    if (selectedCategory === "All") {
      setPosts(allPosts);
    } else {
      const filteredPosts = allPosts.filter(
        (post) => post.Category?.slug === selectedSlug
      );
      setPosts(filteredPosts);
    }
  }, [selectedCategory, allPosts]);

  console.log("PP", posts);

  const categories = [
    "All",
    ...new Set(allPosts.map((post) => post?.Category?.name).filter(Boolean)),
  ];

  const displayedPosts = posts.slice(0, displayCount);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <BlogHeader />
      {/* Hero Section */}
      <section className="px-6 py-12 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stories, ideas, and insights from our community of writers.
          </p>
        </div>
      </section>

      {loading && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Loading posts...</p>
        </div>
      )}
      {!loading && !error && <></>}

      {/* Filters Section */}
      <section className="px-6 py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          {displayedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No posts found
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {displayedPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    author={post.User?.name}
                    category={post.Category?.name}
                    created_at={post.createdAt}
                  />
                ))}
              </div>

              {displayCount < posts.length && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setDisplayCount(displayCount + 6)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPageClient;
