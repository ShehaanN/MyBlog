"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";

const PostsPage = () => {
  const posts = [
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
      readingTime: "5 min read",
      viewCount: 329,
    },
  ];
  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader />
        <h1>Posts Page</h1>
      </div>
    </div>
  );
};

export default PostsPage;
