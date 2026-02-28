import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PROFILE_REPOSITORY,
  IProfileRepository,
} from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: IProfileRepository,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.findAll();
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findById(id);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found.`);
    }
    return profile;
  }

  create(dto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.create(dto);
  }

  async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
    await this.findOne(id); // throws NotFoundException if missing
    return this.profileRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // throws NotFoundException if missing
    return this.profileRepository.delete(id);
  }
}
