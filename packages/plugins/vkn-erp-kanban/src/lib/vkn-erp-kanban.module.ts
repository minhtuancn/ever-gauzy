import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { TenantModule } from '@gauzy/core';
import * as entities from './entities';
import * as controllers from './controllers';
import * as services from './services';

@Module({
  imports: [
    RouterModule.register([
      { path: '/vkn-erp/kanban', module: VknErpKanbanModule }
    ]),
    TypeOrmModule.forFeature(Object.values(entities)),
    TenantModule
  ],
  controllers: Object.values(controllers),
  providers: Object.values(services),
  exports: Object.values(services)
})
export class VknErpKanbanModule {}
