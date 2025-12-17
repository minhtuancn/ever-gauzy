import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknTrainingEntity } from '../entities';

@Injectable()
export class VknTrainingService extends TenantAwareCrudService<VknTrainingEntity> {
  constructor(
    @InjectRepository(VknTrainingEntity)
    protected readonly repository: Repository<VknTrainingEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknTrainingEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
