"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

const CategoriesPage = () => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Development", slug: "development" },
    { id: 2, name: "Design", slug: "design" },
    { id: 3, name: "DevOps", slug: "devops" },
  ]);
  const handleEditCategory = (id: number) => {
    setEditingCategory(id);
  };

  const handleSaveCategory = (id: number, newName: string) => {
    console.log("Saving category:", id, newName);

    setEditingCategory(null);
  };
  const handleAddCategory = () => {
    const category = {
      name: newCategory,
      slug: newCategory.toLowerCase().replace(/\s+/g, "-"),
    };
    console.log("Adding category:", category);
    setNewCategory("");
  };
  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader />
        <main className="flex-1 px-6 py-8 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Categories</h1>
              <p className="text-muted-foreground mt-1">
                Manage your blog categories
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name..."
              />
              <Button onClick={handleAddCategory} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 rounded-lg bg-card border border-border flex items-center justify-between hover:border-primary transition"
                >
                  <div>
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        defaultValue={category.name}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveCategory(
                              category.id,
                              e.currentTarget.value
                            );
                          }
                        }}
                        autoFocus
                        className="flex p-0.5 border border-primary rounded-md"
                      />
                    ) : (
                      <span style={{ fontWeight: "500", color: "#0f172a" }}>
                        {category.name}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditCategory(category.id)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoriesPage;
