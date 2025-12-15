const BASE_URL = "http://localhost:4000/api/v1";

interface Category {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  Posts?: Post[];
}

interface PostUser {
  id: number;
  name: string;
  email: string;
}

interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  categoryId: number;
  userId: number;
  User: PostUser;
  Category: PostCategory;
  status: "published" | "draft" | "archived";
  readingTime?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateCategoryDto {
  name: string;
}

interface UpdateCategoryDto {
  name?: string;
}

interface CreatePostDto {
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  status?: "published" | "draft" | "archived";
  readingTime?: string;
}

interface UpdatePostDto {
  title?: string;
  excerpt?: string;
  content?: string;
  categoryId?: number;
  status?: "published" | "draft" | "archived";
  readingTime?: string;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

const createHeaders = (includeAuth: boolean = true) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

class API {
  // Category APIs
  static async getAllCategories(userId: number): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories/${userId}`, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getAllPublicCategories(): Promise<Category[]> {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: createHeaders(false),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getCategoryById(id: number, userId: number): Promise<Category> {
    const response = await fetch(`${BASE_URL}/categories/${id}/${userId}`, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async createCategory(
    userId: number,
    data: CreateCategoryDto
  ): Promise<Category> {
    const response = await fetch(`${BASE_URL}/categories/${userId}`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async updateCategory(
    id: number,
    userId: number,
    data: UpdateCategoryDto
  ): Promise<Category> {
    const response = await fetch(`${BASE_URL}/categories/${id}/${userId}`, {
      method: "PUT",
      headers: createHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteCategory(id: number, userId: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/categories/${id}/${userId}`, {
      method: "DELETE",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  }

  // Post APIs
  static async getAllPosts(): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: createHeaders(false),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getAllPostsAdmin(userId: number): Promise<Post[]> {
    const response = await fetch(`${BASE_URL}/posts/admin/${userId}`, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getPostBySlug(slug: string): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/slug/${slug}`, {
      method: "GET",
      headers: createHeaders(false),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getPostById(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "GET",
      headers: createHeaders(false),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async createPost(userId: number, data: CreatePostDto): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${userId}`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async updatePost(
    id: number,
    userId: number,
    data: UpdatePostDto
  ): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}/${userId}`, {
      method: "PUT",
      headers: createHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async deletePost(id: number, userId: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/posts/${id}/${userId}`, {
      method: "DELETE",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  }
}

export default API;

export type {
  Category,
  Post,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreatePostDto,
  UpdatePostDto,
};
