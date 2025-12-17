import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknContractsService } from './vkn-contracts.service';
import { VknContractsEntity } from '../entities';

describe('VknContractsService', () => {
  let service: VknContractsService;
  let repository: Repository<VknContractsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknContractsService,
        {
          provide: getRepositoryToken(VknContractsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknContractsService>(VknContractsService);
    repository = module.get<Repository<VknContractsEntity>>(
      getRepositoryToken(VknContractsEntity)
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
