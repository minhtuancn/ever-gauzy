import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknFleetEntity } from '../entities';

@Injectable()
export class VknFleetService extends TenantAwareCrudService<VknFleetEntity> {
  constructor(
    @InjectRepository(VknFleetEntity)
    protected readonly repository: Repository<VknFleetEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknFleetEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
