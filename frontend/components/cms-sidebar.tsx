import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { FileText, Layers, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CMSSidebar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const navItems = [
    { href: "/cms/posts", icon: FileText, label: "Posts" },
    { href: "/cms/categories", icon: Layers, label: "Categories" },
  ];
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 bg-card border-r border-border min-h-screen transition-transform md:translate-x-0 z-40 `}
      >
        <div className="p-6 space-y-8">
          <div className="pt-2">
            <Link href={"/blog"}>
              <h1 className="text-2xl font-bold text-primary">MyBlog</h1>
            </Link>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-8 border-t border-border">
            <Button
              variant="outline"
              className="w-full gap-2 justify-start bg-transparent"
              onClick={logout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CMSSidebar;
