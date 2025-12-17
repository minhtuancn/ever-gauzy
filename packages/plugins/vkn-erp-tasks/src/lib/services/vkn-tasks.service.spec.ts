import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknTasksService } from './vkn-tasks.service';
import { VknTasksEntity } from '../entities';

describe('VknTasksService', () => {
  let service: VknTasksService;
  let repository: Repository<VknTasksEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknTasksService,
        {
          provide: getRepositoryToken(VknTasksEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknTasksService>(VknTasksService);
    repository = module.get<Repository<VknTasksEntity>>(
      getRepositoryToken(VknTasksEntity)
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
