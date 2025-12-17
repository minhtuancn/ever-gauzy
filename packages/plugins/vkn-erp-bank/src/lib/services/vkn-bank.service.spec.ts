import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknBankService } from './vkn-bank.service';
import { VknBankEntity } from '../entities';

describe('VknBankService', () => {
  let service: VknBankService;
  let repository: Repository<VknBankEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknBankService,
        {
          provide: getRepositoryToken(VknBankEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknBankService>(VknBankService);
    repository = module.get<Repository<VknBankEntity>>(
      getRepositoryToken(VknBankEntity)
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
