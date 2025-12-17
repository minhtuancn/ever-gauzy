import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPurchasingEntity } from '../entities';

@Injectable()
export class VknPurchasingService extends TenantAwareCrudService<VknPurchasingEntity> {
  constructor(
    @InjectRepository(VknPurchasingEntity)
    protected readonly repository: Repository<VknPurchasingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPurchasingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
