import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknAgricultureEntity } from '../entities';

@Injectable()
export class VknAgricultureService extends TenantAwareCrudService<VknAgricultureEntity> {
  constructor(
    @InjectRepository(VknAgricultureEntity)
    protected readonly repository: Repository<VknAgricultureEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknAgricultureEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
