import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknSaasService } from './vkn-saas.service';
import { VknSaasEntity } from '../entities';

describe('VknSaasService', () => {
  let service: VknSaasService;
  let repository: Repository<VknSaasEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknSaasService,
        {
          provide: getRepositoryToken(VknSaasEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknSaasService>(VknSaasService);
    repository = module.get<Repository<VknSaasEntity>>(
      getRepositoryToken(VknSaasEntity)
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
