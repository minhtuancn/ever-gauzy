import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknInventoryService } from './vkn-inventory.service';
import { VknInventoryEntity } from '../entities';

describe('VknInventoryService', () => {
  let service: VknInventoryService;
  let repository: Repository<VknInventoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknInventoryService,
        {
          provide: getRepositoryToken(VknInventoryEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknInventoryService>(VknInventoryService);
    repository = module.get<Repository<VknInventoryEntity>>(
      getRepositoryToken(VknInventoryEntity)
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
