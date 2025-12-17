import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknCrmService } from './vkn-crm.service';
import { VknCrmEntity } from '../entities';

describe('VknCrmService', () => {
  let service: VknCrmService;
  let repository: Repository<VknCrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknCrmService,
        {
          provide: getRepositoryToken(VknCrmEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknCrmService>(VknCrmService);
    repository = module.get<Repository<VknCrmEntity>>(
      getRepositoryToken(VknCrmEntity)
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
