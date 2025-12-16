import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { TenantModule } from '@gauzy/core';
import { VknCompanySettings, VknAuditLog } from './entities';
import { VknCompanySettingsService } from './services';
import { VknCompanySettingsController } from './controllers';

@Module({
	imports: [
		RouterModule.register([
			{
				path: '/vkn-erp/core',
				module: VknErpCoreModule
			}
		]),
		TypeOrmModule.forFeature([
			VknCompanySettings,
			VknAuditLog
		]),
		TenantModule,
		CqrsModule
	],
	controllers: [VknCompanySettingsController],
	providers: [VknCompanySettingsService],
	exports: [VknCompanySettingsService]
})
export class VknErpCoreModule {}
