import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

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
  @UseGuards(JwtAuthGuard)
  async getAllCategories(@Param('userId', ParseIntPipe) userId: number) {
    return this.categoriesService.getAllCategories(userId);
  }

  // Get category by ID
  @Get(':id/:userId')
  @UseGuards(JwtAuthGuard)
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.categoriesService.getCategoryById(id, userId);
  }

  // Create a new category
  @Post(':userId')
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(createCategoryDto, userId);
  }

  // Update a category
  @Put(':id/:userId')
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto, userId);
  }

  // Delete a category
  @Delete(':id/:userId')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.categoriesService.deleteCategory(id, userId);
  }
}
