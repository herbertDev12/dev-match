import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profile.findMany();
  }

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }

    return profile;
  }

  create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({ data: createProfileDto });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    await this.findOne(id);
    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // throws NotFoundException if not found
    await this.prisma.profile.delete({ where: { id } });
  }
}
