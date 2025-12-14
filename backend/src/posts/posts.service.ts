import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service.js';

interface CreatePostDto {
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  status?: 'published' | 'draft' | 'archived';
  readingTime?: string;
}

interface UpdatePostDto {
  title?: string;
  excerpt?: string;
  content?: string;
  categoryId?: number;
  status?: 'published' | 'draft' | 'archived';
  readingTime?: string;
}

@Injectable()
export class PostsService {
  constructor(private readonly db: PrismaService) {}

  // Get all published posts
  async getAllPosts() {
    try {
      return await this.db.post.findMany({
        where: { status: 'published' },
        orderBy: { createdAt: 'desc' },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    } catch (error) {
      console.error('getAllPosts error:', error);
      throw new InternalServerErrorException('Failed to get posts');
    }
  }

  // Get all posts for admin
  async getAllPostsAdmin(userId: number) {
    try {
      return await this.db.post.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: 'desc' },
        include: {
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    } catch (error) {
      console.error('getAllPostsAdmin error:', error);
      throw new InternalServerErrorException('Failed to get posts');
    }
  }

  // Get post by slug
  async getPostBySlug(slug: string) {
    try {
      const post = await this.db.post.findUnique({
        where: { slug },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      // Increment view count
      await this.db.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
      });

      return post;
    } catch (error) {
      console.error('getPostBySlug error:', error);
      throw new InternalServerErrorException('Failed to get post');
    }
  }

  // Get post by ID
  async getPostById(postId: number) {
    try {
      const post = await this.db.post.findUnique({
        where: { id: postId },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return post;
    } catch (error) {
      console.error('getPostById error:', error);
      throw new InternalServerErrorException('Failed to get post');
    }
  }

  // Create post
  async createPost(data: CreatePostDto, userId: number) {
    try {
      // Generate slug from title
      const slug = this.generateSlug(data.title);

      const existingPost = await this.db.post.findUnique({ where: { slug } });
      if (existingPost) {
        throw new ForbiddenException('A post with this title already exists');
      }

      const readingTime =
        data.readingTime ?? this.calculateReadingTime(data.content);

      return await this.db.post.create({
        data: {
          title: data.title,
          excerpt: data.excerpt,
          slug,
          content: data.content,
          status: data.status ?? 'draft',
          readingTime,
          viewCount: 0,
          authorId: userId,
          categoryId: data.categoryId,
          updatedAt: new Date(),
        },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    } catch (error) {
      console.error('createPost error:', error);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  // Update post - only own post
  async updatePost(postId: number, data: UpdatePostDto, userId: number) {
    try {
      const post = await this.db.post.findUnique({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.authorId !== userId) {
        throw new ForbiddenException('You can only update your own posts');
      }

      // Generate new slug if title changed
      let slug = post.slug;
      if (data.title && data.title !== post.title) {
        slug = this.generateSlug(data.title);

        // Check if new slug already exists (excluding current post)
        const existingPost = await this.db.post.findFirst({
          where: { slug, id: { not: postId } },
        });
        if (existingPost) {
          throw new ForbiddenException('A post with this title already exists');
        }
      }

      // Recalculate reading time if content changed
      const readingTime = data.content
        ? this.calculateReadingTime(data.content)
        : post.readingTime;

      return await this.db.post.update({
        where: { id: postId },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.excerpt && { excerpt: data.excerpt }),
          ...(data.content && { content: data.content }),
          ...(data.status && { status: data.status }),
          ...(data.categoryId && { categoryId: data.categoryId }),
          slug,
          readingTime,
          updatedAt: new Date(),
        },
        include: {
          User: {
            select: { id: true, name: true, email: true },
          },
          Category: {
            select: { id: true, name: true, slug: true },
          },
        },
      });
    } catch (error) {
      console.error('updatePost error:', error);
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  // Delete post - only own post
  async deletePost(postId: number, userId: number) {
    try {
      const post = await this.db.post.findUnique({ where: { id: postId } });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.authorId !== userId) {
        throw new ForbiddenException('You can only delete your own posts');
      }

      await this.db.post.delete({ where: { id: postId } });

      return { message: 'Post deleted successfully' };
    } catch (error) {
      console.error('deletePost error:', error);
      throw new InternalServerErrorException('Failed to delete post');
    }
  }

  // Generate slug from title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  //Calculate reading time
  private calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }
}
