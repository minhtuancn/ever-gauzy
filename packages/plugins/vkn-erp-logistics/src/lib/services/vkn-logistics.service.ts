import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknLogisticsEntity } from '../entities';

@Injectable()
export class VknLogisticsService extends TenantAwareCrudService<VknLogisticsEntity> {
  constructor(
    @InjectRepository(VknLogisticsEntity)
    protected readonly repository: Repository<VknLogisticsEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknLogisticsEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
