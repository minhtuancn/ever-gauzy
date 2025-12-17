import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknKanbanService } from './vkn-kanban.service';
import { VknKanbanEntity } from '../entities';

describe('VknKanbanService', () => {
  let service: VknKanbanService;
  let repository: Repository<VknKanbanEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknKanbanService,
        {
          provide: getRepositoryToken(VknKanbanEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknKanbanService>(VknKanbanService);
    repository = module.get<Repository<VknKanbanEntity>>(
      getRepositoryToken(VknKanbanEntity)
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
