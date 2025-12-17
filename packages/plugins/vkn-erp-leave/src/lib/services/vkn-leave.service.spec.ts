import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknLeaveService } from './vkn-leave.service';
import { VknLeaveEntity } from '../entities';

describe('VknLeaveService', () => {
  let service: VknLeaveService;
  let repository: Repository<VknLeaveEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknLeaveService,
        {
          provide: getRepositoryToken(VknLeaveEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknLeaveService>(VknLeaveService);
    repository = module.get<Repository<VknLeaveEntity>>(
      getRepositoryToken(VknLeaveEntity)
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
