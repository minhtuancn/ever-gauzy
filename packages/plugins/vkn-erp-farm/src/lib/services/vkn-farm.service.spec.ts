import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknFarmService } from './vkn-farm.service';
import { VknFarmEntity } from '../entities';

describe('VknFarmService', () => {
  let service: VknFarmService;
  let repository: Repository<VknFarmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknFarmService,
        {
          provide: getRepositoryToken(VknFarmEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknFarmService>(VknFarmService);
    repository = module.get<Repository<VknFarmEntity>>(
      getRepositoryToken(VknFarmEntity)
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
