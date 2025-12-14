import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { PrismaModule } from './config/prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, CategoriesModule, PrismaModule, AuthModule],
})
export class AppModule {}
