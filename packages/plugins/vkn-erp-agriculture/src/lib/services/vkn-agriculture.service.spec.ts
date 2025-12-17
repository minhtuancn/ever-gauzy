import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknAgricultureService } from './vkn-agriculture.service';
import { VknAgricultureEntity } from '../entities';

describe('VknAgricultureService', () => {
  let service: VknAgricultureService;
  let repository: Repository<VknAgricultureEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknAgricultureService,
        {
          provide: getRepositoryToken(VknAgricultureEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknAgricultureService>(VknAgricultureService);
    repository = module.get<Repository<VknAgricultureEntity>>(
      getRepositoryToken(VknAgricultureEntity)
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
