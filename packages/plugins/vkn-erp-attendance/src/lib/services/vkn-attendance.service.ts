import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknAttendanceEntity } from '../entities';

@Injectable()
export class VknAttendanceService extends TenantAwareCrudService<VknAttendanceEntity> {
  constructor(
    @InjectRepository(VknAttendanceEntity)
    protected readonly repository: Repository<VknAttendanceEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknAttendanceEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
