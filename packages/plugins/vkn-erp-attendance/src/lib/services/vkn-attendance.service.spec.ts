import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknAttendanceService } from './vkn-attendance.service';
import { VknAttendanceEntity } from '../entities';

describe('VknAttendanceService', () => {
  let service: VknAttendanceService;
  let repository: Repository<VknAttendanceEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknAttendanceService,
        {
          provide: getRepositoryToken(VknAttendanceEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknAttendanceService>(VknAttendanceService);
    repository = module.get<Repository<VknAttendanceEntity>>(
      getRepositoryToken(VknAttendanceEntity)
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
