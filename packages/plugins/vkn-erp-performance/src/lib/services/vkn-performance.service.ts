import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPerformanceEntity } from '../entities';

@Injectable()
export class VknPerformanceService extends TenantAwareCrudService<VknPerformanceEntity> {
  constructor(
    @InjectRepository(VknPerformanceEntity)
    protected readonly repository: Repository<VknPerformanceEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPerformanceEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
