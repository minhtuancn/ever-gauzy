import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknPurchasingService } from './vkn-purchasing.service';
import { VknPurchasingEntity } from '../entities';

describe('VknPurchasingService', () => {
  let service: VknPurchasingService;
  let repository: Repository<VknPurchasingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknPurchasingService,
        {
          provide: getRepositoryToken(VknPurchasingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknPurchasingService>(VknPurchasingService);
    repository = module.get<Repository<VknPurchasingEntity>>(
      getRepositoryToken(VknPurchasingEntity)
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
