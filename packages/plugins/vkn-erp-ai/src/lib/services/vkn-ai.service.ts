import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknAiEntity } from '../entities';

@Injectable()
export class VknAiService extends TenantAwareCrudService<VknAiEntity> {
  constructor(
    @InjectRepository(VknAiEntity)
    protected readonly repository: Repository<VknAiEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknAiEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
