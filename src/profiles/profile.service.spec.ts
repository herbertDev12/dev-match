import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProfilesService } from './application/profiles.service';
import { PROFILE_REPOSITORY } from './domain/profile.repository';
import { Profile } from './domain/profile.entity';

const mockRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: PROFILE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a profile when found', async () => {
      const profile: Profile = {
        id: 'test-id',
        name: 'Alice',
        description: 'Dev',
      };
      mockRepository.findById.mockResolvedValue(profile);

      const result = await service.findOne('test-id');
      expect(result).toEqual(profile);
    });

    it('should throw NotFoundException when profile not found', async () => {
      mockRepository.findById.mockResolvedValue(null);
      await expect(service.findOne('missing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
