"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import API, { Category } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const NewPostPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const getAllPublicCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await API.getAllPublicCategories();

        setCategories(data);
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

    getAllPublicCategories();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      await API.createPost(user.id, {
        title,
        excerpt,
        content,
        categoryId: Number(category),
        status,
      });

      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error creating post:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader />
        <main className="flex-1 px-6 py-8 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link
                href="/cms/posts"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Posts
              </Link>
              <div className="flex gap-2">
                <Button onClick={handleSave}>Publish</Button>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Excerpt</Label>
                <Input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Content</Label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="w-full h-64 p-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Category</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Status</Label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewPostPage;
