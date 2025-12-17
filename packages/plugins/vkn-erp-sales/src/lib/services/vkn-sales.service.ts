import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknSalesEntity } from '../entities';

@Injectable()
export class VknSalesService extends TenantAwareCrudService<VknSalesEntity> {
  constructor(
    @InjectRepository(VknSalesEntity)
    protected readonly repository: Repository<VknSalesEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknSalesEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
