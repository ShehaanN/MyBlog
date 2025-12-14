import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';

interface CreateCategoryDto {
  name: string;
}

interface UpdateCategoryDto {
  name?: string;
}

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Get all categories for a user
  @Get(':userId')
  async getAllCategories(@Param('userId', ParseIntPipe) userId: number) {
    return this.categoriesService.getAllCategories(userId);
  }

  // Get category by ID
  @Get(':id/:userId')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.categoriesService.getCategoryById(id, userId);
  }

  // Create a new category
  @Post(':userId')
  async createCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(createCategoryDto, userId);
  }

  // Update a category
  @Put(':id/:userId')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto, userId);
  }

  // Delete a category
  @Delete(':id/:userId')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.categoriesService.deleteCategory(id, userId);
  }
}
