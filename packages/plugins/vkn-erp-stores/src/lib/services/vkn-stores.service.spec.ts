import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknStoresService } from './vkn-stores.service';
import { VknStoresEntity } from '../entities';

describe('VknStoresService', () => {
  let service: VknStoresService;
  let repository: Repository<VknStoresEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknStoresService,
        {
          provide: getRepositoryToken(VknStoresEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknStoresService>(VknStoresService);
    repository = module.get<Repository<VknStoresEntity>>(
      getRepositoryToken(VknStoresEntity)
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
