import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknHrEntity } from '../entities';

@Injectable()
export class VknHrService extends TenantAwareCrudService<VknHrEntity> {
  constructor(
    @InjectRepository(VknHrEntity)
    protected readonly repository: Repository<VknHrEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknHrEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
