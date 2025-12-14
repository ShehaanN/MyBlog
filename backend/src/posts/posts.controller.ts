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
import { PostsService } from './posts.service.js';

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

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get all published posts
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  // Get all posts for admin
  @Get('admin/:userId')
  async getAllPostsAdmin(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.getAllPostsAdmin(userId);
  }

  // Get post by slug| view++
  @Get('slug/:slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return this.postsService.getPostBySlug(slug);
  }

  // Get post by ID
  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // Create a new post
  @Post(':userId')
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(createPostDto, userId);
  }

  // Update a post
  @Put(':id/:userId')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto, userId);
  }

  // Delete a post
  @Delete(':id/:userId')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.deletePost(id, userId);
  }
}
