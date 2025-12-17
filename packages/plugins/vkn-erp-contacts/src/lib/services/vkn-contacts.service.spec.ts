import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknContactsService } from './vkn-contacts.service';
import { VknContactsEntity } from '../entities';

describe('VknContactsService', () => {
  let service: VknContactsService;
  let repository: Repository<VknContactsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknContactsService,
        {
          provide: getRepositoryToken(VknContactsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknContactsService>(VknContactsService);
    repository = module.get<Repository<VknContactsEntity>>(
      getRepositoryToken(VknContactsEntity)
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
