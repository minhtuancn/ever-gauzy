import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknInventoryEntity } from '../entities';

@Injectable()
export class VknInventoryService extends TenantAwareCrudService<VknInventoryEntity> {
  constructor(
    @InjectRepository(VknInventoryEntity)
    protected readonly repository: Repository<VknInventoryEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknInventoryEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
