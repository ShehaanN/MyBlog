"use client";

import BlogHeader from "@/components/blog-header";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog-card";

const BlogPageClient = () => {
  const allBlogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      excerpt:
        "Learn the basics of Next.js 15 and how to build modern web applications with React.",
      author: "Sarah Anderson",
      date: "2025-01-15",
      category: "Development",
      slug: "getting-started-nextjs-15",
      viewCount: 245,
    },
    {
      id: 2,
      title: "The Future of Web Design",
      excerpt:
        "Exploring emerging trends in web design and what developers should know.",
      author: "John Smith",
      date: "2025-01-14",
      category: "Design",
      slug: "future-of-web-design",
      viewCount: 189,
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      excerpt:
        "Master TypeScript with these essential best practices for production applications.",
      author: "Emma Johnson",
      date: "2025-01-13",
      category: "Development",
      slug: "typescript-best-practices",
      viewCount: 312,
    },
    {
      id: 4,
      title: "React Hooks Deep Dive",
      excerpt:
        "Understanding React Hooks and how to use them effectively in your applications.",
      author: "Sarah Anderson",
      date: "2025-01-12",
      category: "Development",
      slug: "react-hooks-deep-dive",
      viewCount: 156,
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox",
      excerpt: "When to use CSS Grid and when to use Flexbox for your layouts.",
      author: "John Smith",
      date: "2025-01-11",
      category: "Design",
      slug: "css-grid-vs-flexbox",
      viewCount: 423,
    },
    {
      id: 6,
      title: "API Security Best Practices",
      excerpt:
        "Essential security practices for building and maintaining APIs.",
      author: "Emma Johnson",
      date: "2025-01-10",
      category: "Development",
      slug: "api-security-best-practices",
      viewCount: 267,
    },
    {
      id: 7,
      title: "Understanding GraphQL",
      excerpt: "A comprehensive guide to GraphQL and how it differs from REST.",
      author: "John Smith",
      date: "2025-01-09",
      category: "Development",
      slug: "understanding-graphql",
      viewCount: 198,
    },
    {
      id: 8,
      title: "Microservices Architecture",
      excerpt:
        "An introduction to microservices architecture and its benefits.",
      author: "Emma Johnson",
      date: "2025-01-08",
      category: "Development",
      slug: "microservices-architecture",
      viewCount: 345,
    },
  ];

  const [posts, setPosts] = useState(allBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    if (selectedCategory === "All") {
      setPosts(allBlogPosts);
    } else {
      setPosts(
        allBlogPosts.filter((post) => post.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  console.log(posts);

  const categories = [
    "All",
    ...new Set(allBlogPosts.map((post) => post.category)),
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
                  <BlogCard key={post.id} {...post} />
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
