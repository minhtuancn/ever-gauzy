import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknExpensesService } from './vkn-expenses.service';
import { VknExpensesEntity } from '../entities';

describe('VknExpensesService', () => {
  let service: VknExpensesService;
  let repository: Repository<VknExpensesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknExpensesService,
        {
          provide: getRepositoryToken(VknExpensesEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknExpensesService>(VknExpensesService);
    repository = module.get<Repository<VknExpensesEntity>>(
      getRepositoryToken(VknExpensesEntity)
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
