import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknTrainingService } from './vkn-training.service';
import { VknTrainingEntity } from '../entities';

describe('VknTrainingService', () => {
  let service: VknTrainingService;
  let repository: Repository<VknTrainingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknTrainingService,
        {
          provide: getRepositoryToken(VknTrainingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknTrainingService>(VknTrainingService);
    repository = module.get<Repository<VknTrainingEntity>>(
      getRepositoryToken(VknTrainingEntity)
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
