import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    // TODO: replace with a User model once added to Prisma schema
    // For now this is a scaffold demonstrating the auth pattern.
    throw new ConflictException(
      'User model not yet in schema. Add a User model to prisma/schema.prisma to enable registration.',
    );
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    // TODO: replace with a User model once added to Prisma schema
    throw new UnauthorizedException(
      'User model not yet in schema. Add a User model to prisma/schema.prisma to enable login.',
    );
  }

  private signToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ id: string; email: string } | null> {
    // TODO: look up user from DB and verify bcrypt hash
    return null;
  }
}
