import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknFinancialReportingService } from './vkn-financial-reporting.service';
import { VknFinancialReportingEntity } from '../entities';

describe('VknFinancialReportingService', () => {
  let service: VknFinancialReportingService;
  let repository: Repository<VknFinancialReportingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknFinancialReportingService,
        {
          provide: getRepositoryToken(VknFinancialReportingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknFinancialReportingService>(VknFinancialReportingService);
    repository = module.get<Repository<VknFinancialReportingEntity>>(
      getRepositoryToken(VknFinancialReportingEntity)
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
