"use client";

import { Search, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const BlogHeader = () => {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/blog"
              className="font-bold text-2xl hover:text-primary transition"
            >
              MyBlog
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <>
                <Link
                  href="/cms/posts"
                  className="text-foreground hover:text-primary transition"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Dashboard
                  </Button>
                  <Button variant="outline" size="sm">
                    <SquarePen className="inline-flex sm:hidden w-4 h-4" />
                  </Button>
                </Link>
                {/* <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-sm">
                    {user?.name.charAt(0)}
                  </span>
                </div> */}
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
        {searchOpen && (
          <div className=" mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button variant="outline">Search</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BlogHeader;
