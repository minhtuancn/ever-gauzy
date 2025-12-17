import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknProductionService } from './vkn-production.service';
import { VknProductionEntity } from '../entities';

describe('VknProductionService', () => {
  let service: VknProductionService;
  let repository: Repository<VknProductionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknProductionService,
        {
          provide: getRepositoryToken(VknProductionEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknProductionService>(VknProductionService);
    repository = module.get<Repository<VknProductionEntity>>(
      getRepositoryToken(VknProductionEntity)
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
