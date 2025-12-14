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
      slug: "getting-started-nextjs-15",
      content: `Introduction

Next.js 15 brings exciting new features and improvements to the React framework ecosystem. In this comprehensive guide, we'll explore the key features and how to get started.

What's New in Next.js 15

Next.js 15 includes several major improvements:

• Enhanced app router capabilities with new hooks
• Improved performance optimizations and bundle size
• Better developer experience with improved error messages
• New deployment options and edge function support
• Streaming components and progressive rendering

Getting Started

To create a new Next.js 15 project, use the following command:

npx create-next-app@latest my-app

This will guide you through the setup process with various configuration options including TypeScript, ESLint, and styling frameworks.

Key Features Explained

1. Improved Server Components
Next.js 15 provides better server component support with simpler APIs for data fetching and component composition.

2. Enhanced Routing
The new routing system offers more flexibility for dynamic segments and parallel routes.

Conclusion

Next.js 15 is a powerful update that makes building modern web applications easier than ever. Start exploring today!`,
      author: "Sarah Anderson",
      createdAt: "2025-01-15",
      category: "Development",
      updatedAt: "2025-01-16",
      readingTime: "5 min read",
      viewCount: 245,
    },
    {
      id: 2,
      title: "TypeScript Tips for Large-Scale Apps",
      excerpt:
        "Practical TypeScript patterns and tips to keep large codebases maintainable and type-safe.",
      slug: "typescript-tips-large-scale",
      content: `Introduction

Scaling TypeScript across large teams introduces challenges around typings, build times, and developer ergonomics.

Core Practices

• Use strict mode and incremental migration
• Prefer discriminated unions for complex states
• Centralize common types in a shared package
• Leverage project references to speed up builds

Tooling

Integrate with ESLint, ts-node-dev, and type-aware testing frameworks to improve DX.

Summary

Adopting these patterns helps prevent technical debt and keeps TypeScript a productivity booster in large projects.`,
      author: "Liam Wong",
      createdAt: "2025-02-03",
      category: "TypeScript",
      updatedAt: "2025-02-04",
      readingTime: "6 min read",
      viewCount: 412,
    },
    {
      id: 3,
      title: "Design Systems: Building Reusable UI",
      excerpt:
        "How to create a design system that scales: tokens, components, and governance.",
      slug: "design-systems-reusable-ui",
      content: `Overview

A good design system unifies product experience and speeds up development by providing reusable building blocks.

Components

• Atomic components with clear props
• Theming with design tokens (colors, spacing, typography)
• Accessibility baked into components

Governance

Establish contribution guidelines, versioning, and a changelog to keep the system healthy.

Conclusion

Invest in a design system early to save time and maintain consistency across products.`,
      author: "Priya Desai",
      createdAt: "2025-03-10",
      category: "Design",
      updatedAt: "2025-03-12",
      readingTime: "4 min read",
      viewCount: 178,
    },
    {
      id: 4,
      title: "CI/CD for Modern Web Apps",
      excerpt:
        "Set up continuous integration and delivery pipelines tailored for frontend applications.",
      slug: "ci-cd-modern-web-apps",
      content: `Introduction

Continuous integration and delivery are essential for shipping features quickly and safely.

Pipeline Tips

• Run linting, type checks, and tests in CI
• Use build artifacts for deployments
• Canary releases & feature flags for safer rollouts

Tools

Popular options include GitHub Actions, CircleCI, and GitLab CI. Choose based on team needs and scalability.

Final Thoughts

Good CI/CD practices reduce risk and increase developer confidence.`,
      author: "Miguel Ortiz",
      createdAt: "2025-04-01",
      category: "DevOps",
      updatedAt: "2025-04-02",
      readingTime: "5 min read",
      viewCount: 329,
    },
    {
      id: 5,
      title: "Writing Effective Unit Tests",
      excerpt:
        "Strategies and examples for writing unit tests that are fast, reliable, and maintainable.",
      slug: "writing-effective-unit-tests",
      content: `Why Unit Tests Matter

Unit tests catch regressions early and document expected behavior.

Best Practices

• Keep tests focused and deterministic
• Mock external dependencies
• Use test data builders for readability
• Run tests in CI and keep them fast

Example

Show simple examples using Jest and React Testing Library to demonstrate component testing patterns.

Conclusion

Quality unit tests improve long-term velocity and confidence.`,
      author: "Aisha Khan",
      createdAt: "2025-05-18",
      category: "Testing",
      updatedAt: "2025-05-19",
      readingTime: "7 min read",
      viewCount: 287,
    },
    {
      id: 6,
      title: "Accessibility Checklist for Frontend Teams",
      excerpt:
        "A practical checklist to ensure your web app is accessible to all users.",
      slug: "accessibility-checklist-frontend",
      content: `Introduction

Accessibility ensures your app is usable by people with disabilities and improves overall UX.

Checklist Highlights

• Semantic HTML and correct landmarks
• Keyboard navigability across interactive elements
• Color contrast and resizable text
• ARIA only when necessary and tested

Integrate

Add accessibility checks to PR reviews and automated tests.

Wrap-up

Accessibility is a continuous effort — start small and iterate.`,
      author: "Noah Green",
      createdAt: "2025-06-05",
      category: "Accessibility",
      updatedAt: "2025-06-05",
      readingTime: "3 min read",
      viewCount: 156,
    },
    {
      id: 7,
      title: "Productivity Hacks for Remote Engineers",
      excerpt:
        "Practical habits and tools to stay focused and productive while working remotely.",
      slug: "productivity-hacks-remote-engineers",
      content: `Intro

Remote work requires discipline and the right setup to maintain productivity.

Habits

• Time blocking and deep work sessions
• Clear async communication norms
• Minimal context switches and batch tasks

Tools

Use project boards, lightweight status updates, and good note-taking systems to stay aligned.

Conclusion

Combining the right habits with tools helps remote engineers produce consistent, high-quality work.`,
      author: "Elena Petrova",
      createdAt: "2025-07-09",
      category: "Productivity",
      updatedAt: "2025-07-10",
      readingTime: "5 min read",
      viewCount: 203,
    },
    {
      id: 8,
      title: "Edge Computing with Middleware",
      excerpt:
        "Leverage edge middleware and functions to reduce latency and improve user experience.",
      slug: "edge-computing-middleware",
      content: `Overview

Edge computing enables running logic closer to users, improving latency and enabling personalized responses.

Key Patterns

• Use middleware for routing, authentication, and A/B tests at the edge
• Cache responses intelligently with short TTLs for dynamic content
• Prefer idempotent operations and stateless functions

Performance Tips

• Minimize bundle size for edge functions
• Offload heavy processing to background jobs or dedicated services
• Monitor cold starts and optimize warm-up strategies

Security and Observability

Ensure secure tokens, rate limiting, and distributed tracing for edge functions to keep systems observable and safe.`,
      author: "Carlos Mendes",
      createdAt: "2025-08-12",
      category: "Infrastructure",
      updatedAt: "2025-08-13",
      readingTime: "6 min read",
      viewCount: 191,
    },
    {
      id: 9,
      title: "GraphQL Best Practices",
      excerpt:
        "Guidelines for designing scalable, performant, and secure GraphQL APIs.",
      slug: "graphql-best-practices",
      content: `Introduction

GraphQL offers flexible data fetching but requires careful design to scale effectively.

Schema Design

• Design clear, intention-revealing types and avoid over-fetching
• Use pagination (cursor-based) for list fields
• Separate public and internal schemas when needed

Performance

• Batch and cache resolvers where appropriate
• Implement persisted queries and query complexity analysis
• Use data loaders to avoid N+1 query problems

Security

• Validate incoming queries and enforce rate limits
• Authenticate and authorize at the resolver level
• Avoid exposing implementation details in error messages

Operational Concerns

Monitor query patterns, enforce timeouts, and provide good developer docs to keep the API maintainable.`,
      author: "Maya Chen",
      createdAt: "2025-09-21",
      category: "APIs",
      updatedAt: "2025-09-22",
      readingTime: "8 min read",
      viewCount: 521,
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
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    content={post.content}
                    author={post.author}
                    category={post.category}
                    created_at={post.createdAt}
                    updated_at={post.updatedAt}
                    reading_time={post.readingTime}
                    view_count={post.viewCount}
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
