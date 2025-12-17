import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknExpensesEntity } from '../entities';

@Injectable()
export class VknExpensesService extends TenantAwareCrudService<VknExpensesEntity> {
  constructor(
    @InjectRepository(VknExpensesEntity)
    protected readonly repository: Repository<VknExpensesEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknExpensesEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
