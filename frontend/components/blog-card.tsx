import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  viewCount?: number;
}

const BlogCard = ({
  title,
  excerpt,
  author,
  date,
  category,
  slug,
  viewCount = 0,
}: BlogCardProps) => {
  return (
    <article className="group p-6 rounded-lg bg-card border border-border hover:border-primary transition space-y-4">
      <div className="space-y-2">
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-medium">
          {category}
        </span>

        <h3 className="text-xl font-bold group-hover:text-primary transition text-balance">
          {title}
        </h3>
      </div>

      <p className="text-muted-foreground line-clamp-2">{excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="gap-2">
          Read <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </article>
  );
};

export default BlogCard;
