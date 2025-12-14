import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Register
  async register(data: RegisterDto) {
    try {
      const existingUser = await this.db.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.db.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          updatedAt: new Date(),
        },
      });

      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      console.error('Register error:', error);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  // Login user
  async login(data: LoginDto) {
    try {
      const user = await this.db.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate token
      const token = this.generateToken(user.id, user.email);

      return {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException('Failed to login');
    }
  }

  // Get current user profile
  async getProfile(userId: number) {
    try {
      const user = await this.db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('GetProfile error:', error);
      throw new InternalServerErrorException('Failed to get profile');
    }
  }

  // Generate JWT token
  private generateToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
