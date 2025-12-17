import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknWeighingEntity } from '../entities';

@Injectable()
export class VknWeighingService extends TenantAwareCrudService<VknWeighingEntity> {
  constructor(
    @InjectRepository(VknWeighingEntity)
    protected readonly repository: Repository<VknWeighingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknWeighingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
