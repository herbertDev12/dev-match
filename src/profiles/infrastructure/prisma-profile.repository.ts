import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { IProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';

/**
 * Prisma-backed implementation of IProfileRepository.
 * Only this class knows about Prisma — the rest of the app is ORM-agnostic.
 */
@Injectable()
export class PrismaProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  findById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  create(data: Pick<Profile, 'name' | 'description'>): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  update(
    id: string,
    data: Partial<Pick<Profile, 'name' | 'description'>>,
  ): Promise<Profile> {
    return this.prisma.profile.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.profile.delete({ where: { id } });
  }
}
