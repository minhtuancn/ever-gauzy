import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknSaasEntity } from '../entities';

@Injectable()
export class VknSaasService extends TenantAwareCrudService<VknSaasEntity> {
  constructor(
    @InjectRepository(VknSaasEntity)
    protected readonly repository: Repository<VknSaasEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknSaasEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
