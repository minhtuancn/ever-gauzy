import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknLeaveEntity } from '../entities';

@Injectable()
export class VknLeaveService extends TenantAwareCrudService<VknLeaveEntity> {
  constructor(
    @InjectRepository(VknLeaveEntity)
    protected readonly repository: Repository<VknLeaveEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknLeaveEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
