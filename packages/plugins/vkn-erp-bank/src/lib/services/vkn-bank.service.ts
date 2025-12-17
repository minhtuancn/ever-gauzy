import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknBankEntity } from '../entities';

@Injectable()
export class VknBankService extends TenantAwareCrudService<VknBankEntity> {
  constructor(
    @InjectRepository(VknBankEntity)
    protected readonly repository: Repository<VknBankEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknBankEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
