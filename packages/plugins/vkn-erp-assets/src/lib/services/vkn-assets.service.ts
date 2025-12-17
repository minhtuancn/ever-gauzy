import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknAssetsEntity } from '../entities';

@Injectable()
export class VknAssetsService extends TenantAwareCrudService<VknAssetsEntity> {
  constructor(
    @InjectRepository(VknAssetsEntity)
    protected readonly repository: Repository<VknAssetsEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknAssetsEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
