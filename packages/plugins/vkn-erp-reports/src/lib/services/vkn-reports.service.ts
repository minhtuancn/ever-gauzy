import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknReportsEntity } from '../entities';

@Injectable()
export class VknReportsService extends TenantAwareCrudService<VknReportsEntity> {
  constructor(
    @InjectRepository(VknReportsEntity)
    protected readonly repository: Repository<VknReportsEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknReportsEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
