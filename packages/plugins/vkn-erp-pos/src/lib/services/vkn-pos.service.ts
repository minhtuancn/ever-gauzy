import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknPosEntity } from '../entities';

@Injectable()
export class VknPosService extends TenantAwareCrudService<VknPosEntity> {
  constructor(
    @InjectRepository(VknPosEntity)
    protected readonly repository: Repository<VknPosEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknPosEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
