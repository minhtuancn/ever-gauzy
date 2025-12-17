import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknDmsService } from './vkn-dms.service';
import { VknDmsEntity } from '../entities';

describe('VknDmsService', () => {
  let service: VknDmsService;
  let repository: Repository<VknDmsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknDmsService,
        {
          provide: getRepositoryToken(VknDmsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknDmsService>(VknDmsService);
    repository = module.get<Repository<VknDmsEntity>>(
      getRepositoryToken(VknDmsEntity)
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
