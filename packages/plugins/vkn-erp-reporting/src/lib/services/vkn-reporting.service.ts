import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknReportingEntity } from '../entities';

@Injectable()
export class VknReportingService extends TenantAwareCrudService<VknReportingEntity> {
  constructor(
    @InjectRepository(VknReportingEntity)
    protected readonly repository: Repository<VknReportingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknReportingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
