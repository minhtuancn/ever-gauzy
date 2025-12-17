import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknAssetsService } from './vkn-assets.service';
import { VknAssetsEntity } from '../entities';

describe('VknAssetsService', () => {
  let service: VknAssetsService;
  let repository: Repository<VknAssetsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknAssetsService,
        {
          provide: getRepositoryToken(VknAssetsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknAssetsService>(VknAssetsService);
    repository = module.get<Repository<VknAssetsEntity>>(
      getRepositoryToken(VknAssetsEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a repository', () => {
    expect(repository).toBeDefined();
  });

  // Add more test cases here
});
