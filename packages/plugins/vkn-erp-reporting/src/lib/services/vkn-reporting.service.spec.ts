import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknReportingService } from './vkn-reporting.service';
import { VknReportingEntity } from '../entities';

describe('VknReportingService', () => {
  let service: VknReportingService;
  let repository: Repository<VknReportingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknReportingService,
        {
          provide: getRepositoryToken(VknReportingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknReportingService>(VknReportingService);
    repository = module.get<Repository<VknReportingEntity>>(
      getRepositoryToken(VknReportingEntity)
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
