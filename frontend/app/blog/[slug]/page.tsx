"use client";

import BlogHeader from "@/components/blog-header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/api";
import API from "@/lib/api";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await API.getPostBySlug(slug);

        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error ");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <BlogHeader />

      {/* Article */}
      <article className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex space-x-1 mb-6 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:underline flex items-center">
              <ArrowLeft className="w-3 h-3 mr-1 inline-block" />
              Blog
            </Link>
            <span> / </span>
            <span>{post?.title}</span>
          </nav>

          {/* Header */}
          <div className="space-y-4 mb-8 pb-8 border-b border-border">
            <div className="space-y-2">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {post?.Category?.name}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                {post?.title}
              </h1>
            </div>

            {/* Article Info */}
            <div className="flex items-center gap-4 flex-wrap pt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={"/mdp.jpg"}
                  width={40}
                  height={40}
                  alt="Author Avatar"
                  className="w-10 h-10 rounded-full bg-muted"
                />
                <div>
                  <p className="font-medium text-sm">{post?.User?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post?.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {post?.readingTime} min read
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {post?.viewCount} views
              </span>
            </div>
          </div>

          <div
            className="text-gray-900 leading-relaxed"
            style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}
          >
            {post?.content}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
