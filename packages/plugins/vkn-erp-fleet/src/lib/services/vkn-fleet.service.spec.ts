import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknFleetService } from './vkn-fleet.service';
import { VknFleetEntity } from '../entities';

describe('VknFleetService', () => {
  let service: VknFleetService;
  let repository: Repository<VknFleetEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknFleetService,
        {
          provide: getRepositoryToken(VknFleetEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknFleetService>(VknFleetService);
    repository = module.get<Repository<VknFleetEntity>>(
      getRepositoryToken(VknFleetEntity)
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
