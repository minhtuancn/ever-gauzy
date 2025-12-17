import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknSalesService } from './vkn-sales.service';
import { VknSalesEntity } from '../entities';

describe('VknSalesService', () => {
  let service: VknSalesService;
  let repository: Repository<VknSalesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknSalesService,
        {
          provide: getRepositoryToken(VknSalesEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknSalesService>(VknSalesService);
    repository = module.get<Repository<VknSalesEntity>>(
      getRepositoryToken(VknSalesEntity)
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
