import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknAiService } from './vkn-ai.service';
import { VknAiEntity } from '../entities';

describe('VknAiService', () => {
  let service: VknAiService;
  let repository: Repository<VknAiEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknAiService,
        {
          provide: getRepositoryToken(VknAiEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknAiService>(VknAiService);
    repository = module.get<Repository<VknAiEntity>>(
      getRepositoryToken(VknAiEntity)
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
