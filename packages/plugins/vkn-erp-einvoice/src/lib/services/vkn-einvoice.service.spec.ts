import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknEinvoiceService } from './vkn-einvoice.service';
import { VknEinvoiceEntity } from '../entities';

describe('VknEinvoiceService', () => {
  let service: VknEinvoiceService;
  let repository: Repository<VknEinvoiceEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknEinvoiceService,
        {
          provide: getRepositoryToken(VknEinvoiceEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknEinvoiceService>(VknEinvoiceService);
    repository = module.get<Repository<VknEinvoiceEntity>>(
      getRepositoryToken(VknEinvoiceEntity)
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
