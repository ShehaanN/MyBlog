"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
  updatedAt: string;
  status: "published" | "draft" | "archived";
  readingTime: string;
  viewCount: number;
}

const PostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [posts, setPosts] = useState<Post[]>([
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
      author: "Shehan Nadeesha",
      createdAt: "2025-01-15",
      category: "Development",
      updatedAt: "2025-01-16",
      status: "published",
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
      author: "Shehan Nadeesha",
      createdAt: "2025-02-03",
      category: "Development",
      updatedAt: "2025-02-04",
      status: "draft",
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
      author: "Shehan Nadeesha",
      createdAt: "2025-03-10",
      category: "Design",
      updatedAt: "2025-03-12",
      status: "published",
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
      author: "Shehan Nadeesha",
      createdAt: "2025-04-01",
      category: "DevOps",
      updatedAt: "2025-04-02",
      status: "published",
      readingTime: "5 min read",
      viewCount: 329,
    },
  ]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader />
        <main className="flex-1 px-6 py-8 overflow-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold">Posts</h1>
                <p className="text-muted-foreground mt-1">
                  Manage all your blog posts
                </p>
              </div>
              <Link href="/cms/posts/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="gap-2 bg-transparent"
                size="icon"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Posts Table */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className={"border-b border-border last:border-b-0"}
                    >
                      <td className="px-6 py-4 font-medium">{post.title}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {post.category}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-500/10 text-green-700"
                              : "bg-yellow-500/10 text-yellow-700"
                          }`}
                        >
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {post.viewCount}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Delete post</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete the post &quot;
                                {post.title}&quot; ? This action cannot be
                                undone.
                              </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="flex mt-2 sm:justify-between w-full">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button variant="destructive">
                                Confirm Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPosts.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No posts found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostsPage;
