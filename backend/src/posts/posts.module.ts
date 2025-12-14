import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { PrismaModule } from '../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
