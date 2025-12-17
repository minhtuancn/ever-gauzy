import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknRecruitmentEntity } from '../entities';

@Injectable()
export class VknRecruitmentService extends TenantAwareCrudService<VknRecruitmentEntity> {
  constructor(
    @InjectRepository(VknRecruitmentEntity)
    protected readonly repository: Repository<VknRecruitmentEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknRecruitmentEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
