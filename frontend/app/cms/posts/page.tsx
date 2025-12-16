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
import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/lib/api";
import { Post } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const PostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAdminPosts = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);
        const data = await API.getAllPostsAdmin(user.id);

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

    fetchAllAdminPosts();
  }, [user]);

  const handleDeletePost = async (postId: number) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await API.deletePost(postId, user.id);
      const data = await API.getAllPostsAdmin(user.id);
      setPosts(data);
    } catch (err) {
      console.error("Error deleting post:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.Category?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        {post.Category?.name}
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
                        <Link href={`/cms/posts/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
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
                              <Button
                                onClick={() => handleDeletePost(post.id)}
                                variant="destructive"
                              >
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
