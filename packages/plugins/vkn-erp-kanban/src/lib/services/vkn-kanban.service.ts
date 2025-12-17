import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknKanbanEntity } from '../entities';

@Injectable()
export class VknKanbanService extends TenantAwareCrudService<VknKanbanEntity> {
  constructor(
    @InjectRepository(VknKanbanEntity)
    protected readonly repository: Repository<VknKanbanEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknKanbanEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
