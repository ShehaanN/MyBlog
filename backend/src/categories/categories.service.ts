import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service.js';

interface CreateCategoryDto {
  name: string;
}

interface UpdateCategoryDto {
  name?: string;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly db: PrismaService) {}

  // Get all categories for a user
  async getAllCategories(UserId: number) {
    try {
      return await this.db.category.findMany({
        where: { userId: UserId },
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { Post: true },
          },
        },
      });
    } catch (error) {
      console.error('getAllCategories error:', error);
      throw new InternalServerErrorException('Failed to get categories');
    }
  }

  // Get category by ID
  async getCategoryById(id: number, userId: number) {
    try {
      const category = await this.db.category.findFirst({
        where: { id, userId },
        include: {
          _count: {
            select: { Post: true },
          },
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('getCategoryById error:', error);
      throw new InternalServerErrorException('Failed to get category');
    }
  }

  // Create a new category
  async createCategory(data: CreateCategoryDto, userId: number) {
    try {
      const slug = this.generateSlug(data.name);

      const existingCategory = await this.db.category.findFirst({
        where: { slug, userId },
      });

      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }

      return await this.db.category.create({
        data: {
          name: data.name,
          slug,
          userId,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('createCategory error:', error);
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  // Update a category
  async updateCategory(id: number, data: UpdateCategoryDto, userId: number) {
    try {
      const category = await this.db.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      // Generate new slug if name is being updated
      let slug = category.slug;
      if (data.name && data.name !== category.name) {
        slug = this.generateSlug(data.name);

        const existingCategory = await this.db.category.findFirst({
          where: { slug, userId, id: { not: id } },
        });

        if (existingCategory) {
          throw new ConflictException('Category with this name already exists');
        }
      }

      return await this.db.category.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          slug,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('updateCategory error:', error);
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  // Delete a category
  async deleteCategory(id: number, userId: number) {
    try {
      const category = await this.db.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const postsCount = await this.db.post.count({
        where: { categoryId: id },
      });

      if (postsCount > 0) {
        throw new ConflictException(
          `Cannot delete category. It has ${postsCount} post(s) associated with it.`,
        );
      }

      await this.db.category.delete({
        where: { id },
      });

      return { message: 'Category deleted successfully' };
    } catch (error) {
      console.error('deleteCategory error:', error);
      throw new InternalServerErrorException('Failed to delete category');
    }
  }

  //  Generate slug from name
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}
