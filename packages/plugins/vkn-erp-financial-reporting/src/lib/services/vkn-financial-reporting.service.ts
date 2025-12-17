import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknFinancialReportingEntity } from '../entities';

@Injectable()
export class VknFinancialReportingService extends TenantAwareCrudService<VknFinancialReportingEntity> {
  constructor(
    @InjectRepository(VknFinancialReportingEntity)
    protected readonly repository: Repository<VknFinancialReportingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknFinancialReportingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
