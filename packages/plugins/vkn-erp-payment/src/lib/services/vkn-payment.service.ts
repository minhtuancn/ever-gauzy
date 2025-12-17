import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPaymentEntity } from '../entities';

@Injectable()
export class VknPaymentService extends TenantAwareCrudService<VknPaymentEntity> {
  constructor(
    @InjectRepository(VknPaymentEntity)
    protected readonly repository: Repository<VknPaymentEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPaymentEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
