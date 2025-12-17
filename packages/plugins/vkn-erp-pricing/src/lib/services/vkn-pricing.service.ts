import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPricingEntity } from '../entities';

@Injectable()
export class VknPricingService extends TenantAwareCrudService<VknPricingEntity> {
  constructor(
    @InjectRepository(VknPricingEntity)
    protected readonly repository: Repository<VknPricingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPricingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
