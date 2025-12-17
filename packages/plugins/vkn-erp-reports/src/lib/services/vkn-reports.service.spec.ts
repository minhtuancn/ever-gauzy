import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknReportsService } from './vkn-reports.service';
import { VknReportsEntity } from '../entities';

describe('VknReportsService', () => {
  let service: VknReportsService;
  let repository: Repository<VknReportsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknReportsService,
        {
          provide: getRepositoryToken(VknReportsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknReportsService>(VknReportsService);
    repository = module.get<Repository<VknReportsEntity>>(
      getRepositoryToken(VknReportsEntity)
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
