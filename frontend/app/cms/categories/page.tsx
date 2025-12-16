"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import API, { Category } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const CategoriesPage = () => {
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllAdminCategories = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);
        const data = await API.getAllCategories(user.id);

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

    fetchAllAdminCategories();
  }, [user]);

  const handleEditCategory = (id: number) => {
    setEditingCategory(id);
  };

  const handleSaveCategory = async (id: number, newName: string) => {
    if (!user) return;
    try {
      const updatedCategory = await API.updateCategory(id, user.id, {
        name: newName,
      });

      const data = await API.getAllCategories(user.id);
      setCategories(data);
    } catch (error) {
      console.error("Error updating category:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error");
      }
    }

    setEditingCategory(null);
  };
  const handleAddCategory = async () => {
    try {
      if (!user) return;
      await API.createCategory(user.id, { name: newCategory });
      setNewCategory("");
      const data = await API.getAllCategories(user.id);
      setCategories(data);
    } catch (error) {
      console.error("Error adding category:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error");
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      if (!user) return;
      await API.deleteCategory(id, user.id);
      const data = await API.getAllCategories(user.id);
      setCategories(data);
    } catch (error) {
      console.error("Error deleting category:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error");
      }
    }
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
                    <Button
                      onClick={() => handleDeleteCategory(category.id)}
                      variant="destructive"
                      size="sm"
                    >
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
