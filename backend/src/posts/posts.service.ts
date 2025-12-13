import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly DB: PrismaService) {}
}
