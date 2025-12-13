import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [PostsModule, CategoriesModule, PrismaModule],
})
export class AppModule {}
