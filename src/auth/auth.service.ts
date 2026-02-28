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
import { JwtPayload, AuthUser } from './dto/jwt-payload.interface';

const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ accessToken: string }> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('A user with that email already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
      },
    });

    return { accessToken: this.signToken({ sub: user.id, email: user.email }) };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return { accessToken: this.signToken({ sub: user.id, email: user.email }) };
  }

  /**
   * Looks up the user by email and verifies the bcrypt password hash.
   * Returns the user payload on success, or null on failure.
   * Used internally by login — never exposes the hash externally.
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) return null;

    return { id: user.id, email: user.email };
  }

  private signToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
