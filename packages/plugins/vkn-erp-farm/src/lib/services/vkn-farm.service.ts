import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknFarmEntity } from '../entities';

@Injectable()
export class VknFarmService extends TenantAwareCrudService<VknFarmEntity> {
  constructor(
    @InjectRepository(VknFarmEntity)
    protected readonly repository: Repository<VknFarmEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknFarmEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
