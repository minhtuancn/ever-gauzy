import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknCrmEntity } from '../entities';

@Injectable()
export class VknCrmService extends TenantAwareCrudService<VknCrmEntity> {
  constructor(
    @InjectRepository(VknCrmEntity)
    protected readonly repository: Repository<VknCrmEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknCrmEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
