import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknWorkflowEntity } from '../entities';

@Injectable()
export class VknWorkflowService extends TenantAwareCrudService<VknWorkflowEntity> {
  constructor(
    @InjectRepository(VknWorkflowEntity)
    protected readonly repository: Repository<VknWorkflowEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknWorkflowEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
