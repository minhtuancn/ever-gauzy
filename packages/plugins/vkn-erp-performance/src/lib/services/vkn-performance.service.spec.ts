import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknPerformanceService } from './vkn-performance.service';
import { VknPerformanceEntity } from '../entities';

describe('VknPerformanceService', () => {
  let service: VknPerformanceService;
  let repository: Repository<VknPerformanceEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknPerformanceService,
        {
          provide: getRepositoryToken(VknPerformanceEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknPerformanceService>(VknPerformanceService);
    repository = module.get<Repository<VknPerformanceEntity>>(
      getRepositoryToken(VknPerformanceEntity)
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
