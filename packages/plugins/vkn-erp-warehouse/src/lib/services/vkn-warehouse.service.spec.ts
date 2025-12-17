import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknWarehouseService } from './vkn-warehouse.service';
import { VknWarehouseEntity } from '../entities';

describe('VknWarehouseService', () => {
  let service: VknWarehouseService;
  let repository: Repository<VknWarehouseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknWarehouseService,
        {
          provide: getRepositoryToken(VknWarehouseEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknWarehouseService>(VknWarehouseService);
    repository = module.get<Repository<VknWarehouseEntity>>(
      getRepositoryToken(VknWarehouseEntity)
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
