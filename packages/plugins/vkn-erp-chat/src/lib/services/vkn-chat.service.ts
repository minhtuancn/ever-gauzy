import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknChatEntity } from '../entities';

@Injectable()
export class VknChatService extends TenantAwareCrudService<VknChatEntity> {
  constructor(
    @InjectRepository(VknChatEntity)
    protected readonly repository: Repository<VknChatEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknChatEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
