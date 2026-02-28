import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './infrastructure/profiles.controller';
import { ProfilesService } from './application/profiles.service';
import { PROFILE_REPOSITORY } from './domain/profile.repository';

const mockRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        ProfilesService,
        {
          provide: PROFILE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
