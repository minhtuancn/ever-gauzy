import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPayrollEntity } from '../entities';

@Injectable()
export class VknPayrollService extends TenantAwareCrudService<VknPayrollEntity> {
  constructor(
    @InjectRepository(VknPayrollEntity)
    protected readonly repository: Repository<VknPayrollEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPayrollEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
