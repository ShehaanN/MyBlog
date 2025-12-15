"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import API, { Category, PostStatus } from "@/lib/api";

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<number | undefined>();
  const [status, setStatus] = useState<PostStatus>();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Cateies", categories);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoriesData = await API.getAllPublicCategories();

        setCategories(categoriesData);

        const data = await API.getPostById(Number(id));

        console.log("Data", data);

        if (data) {
          setTitle(data.title);
          setExcerpt(data.excerpt);
          setContent(data.content);
          setCategory(data.categoryId);
          setStatus(data.status as PostStatus);
        }
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

    getPostData();
  }, [id]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      await API.updatePost(Number(id), user.id, {
        title,
        excerpt,
        content,
        categoryId: Number(category),
        status,
      });
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
            <div className="flex items-center justify-between">
              <Link
                href="/cms/posts"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Posts
              </Link>
              <div>
                <Button onClick={handleSave}>Update</Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Excerpt</label>
                <Input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  className="w-full h-64 p-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select
                    value={category || ""}
                    onChange={(e) =>
                      setCategory(Number(e.target.value) || undefined)
                    }
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
                  <label className="text-sm font-semibold">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PostStatus)}
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

export default EditPostPage;
