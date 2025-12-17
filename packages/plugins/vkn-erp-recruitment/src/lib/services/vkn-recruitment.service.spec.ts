import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknRecruitmentService } from './vkn-recruitment.service';
import { VknRecruitmentEntity } from '../entities';

describe('VknRecruitmentService', () => {
  let service: VknRecruitmentService;
  let repository: Repository<VknRecruitmentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknRecruitmentService,
        {
          provide: getRepositoryToken(VknRecruitmentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknRecruitmentService>(VknRecruitmentService);
    repository = module.get<Repository<VknRecruitmentEntity>>(
      getRepositoryToken(VknRecruitmentEntity)
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
