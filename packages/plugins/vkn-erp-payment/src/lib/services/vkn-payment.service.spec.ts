import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknPaymentService } from './vkn-payment.service';
import { VknPaymentEntity } from '../entities';

describe('VknPaymentService', () => {
  let service: VknPaymentService;
  let repository: Repository<VknPaymentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknPaymentService,
        {
          provide: getRepositoryToken(VknPaymentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknPaymentService>(VknPaymentService);
    repository = module.get<Repository<VknPaymentEntity>>(
      getRepositoryToken(VknPaymentEntity)
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
