import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknWeighingService } from './vkn-weighing.service';
import { VknWeighingEntity } from '../entities';

describe('VknWeighingService', () => {
  let service: VknWeighingService;
  let repository: Repository<VknWeighingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknWeighingService,
        {
          provide: getRepositoryToken(VknWeighingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknWeighingService>(VknWeighingService);
    repository = module.get<Repository<VknWeighingEntity>>(
      getRepositoryToken(VknWeighingEntity)
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
