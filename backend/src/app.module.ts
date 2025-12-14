import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { PrismaModule } from './config/prisma/prisma.module.js';

@Module({
  imports: [PostsModule, CategoriesModule, PrismaModule],
})
export class AppModule {}
