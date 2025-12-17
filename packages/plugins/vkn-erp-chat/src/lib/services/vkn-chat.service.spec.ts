import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknChatService } from './vkn-chat.service';
import { VknChatEntity } from '../entities';

describe('VknChatService', () => {
  let service: VknChatService;
  let repository: Repository<VknChatEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknChatService,
        {
          provide: getRepositoryToken(VknChatEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknChatService>(VknChatService);
    repository = module.get<Repository<VknChatEntity>>(
      getRepositoryToken(VknChatEntity)
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
