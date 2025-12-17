import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknHrService } from './vkn-hr.service';
import { VknHrEntity } from '../entities';

describe('VknHrService', () => {
  let service: VknHrService;
  let repository: Repository<VknHrEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknHrService,
        {
          provide: getRepositoryToken(VknHrEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknHrService>(VknHrService);
    repository = module.get<Repository<VknHrEntity>>(
      getRepositoryToken(VknHrEntity)
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
