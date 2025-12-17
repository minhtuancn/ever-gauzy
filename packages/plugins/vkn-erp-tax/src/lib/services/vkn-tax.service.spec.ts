import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknTaxService } from './vkn-tax.service';
import { VknTaxEntity } from '../entities';

describe('VknTaxService', () => {
  let service: VknTaxService;
  let repository: Repository<VknTaxEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknTaxService,
        {
          provide: getRepositoryToken(VknTaxEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknTaxService>(VknTaxService);
    repository = module.get<Repository<VknTaxEntity>>(
      getRepositoryToken(VknTaxEntity)
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
