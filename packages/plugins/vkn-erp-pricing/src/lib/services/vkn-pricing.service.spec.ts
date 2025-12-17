import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknPricingService } from './vkn-pricing.service';
import { VknPricingEntity } from '../entities';

describe('VknPricingService', () => {
  let service: VknPricingService;
  let repository: Repository<VknPricingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknPricingService,
        {
          provide: getRepositoryToken(VknPricingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknPricingService>(VknPricingService);
    repository = module.get<Repository<VknPricingEntity>>(
      getRepositoryToken(VknPricingEntity)
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
