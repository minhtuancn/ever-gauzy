import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknWorkflowService } from './vkn-workflow.service';
import { VknWorkflowEntity } from '../entities';

describe('VknWorkflowService', () => {
  let service: VknWorkflowService;
  let repository: Repository<VknWorkflowEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknWorkflowService,
        {
          provide: getRepositoryToken(VknWorkflowEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknWorkflowService>(VknWorkflowService);
    repository = module.get<Repository<VknWorkflowEntity>>(
      getRepositoryToken(VknWorkflowEntity)
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
