import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProfilesController } from './infrastructure/profiles.controller';
import { ProfilesService } from './application/profiles.service';
import { PrismaProfileRepository } from './infrastructure/prisma-profile.repository';
import { PROFILE_REPOSITORY } from './domain/profile.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    {
      provide: PROFILE_REPOSITORY,
      useClass: PrismaProfileRepository,
    },
  ],
})
export class ProfilesModule {}
