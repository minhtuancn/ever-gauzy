import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknDmsEntity } from '../entities';

@Injectable()
export class VknDmsService extends TenantAwareCrudService<VknDmsEntity> {
  constructor(
    @InjectRepository(VknDmsEntity)
    protected readonly repository: Repository<VknDmsEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknDmsEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
