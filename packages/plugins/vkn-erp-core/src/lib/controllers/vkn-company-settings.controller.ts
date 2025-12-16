import {
	Controller,
	Get,
	Post,
	Put,
	Body,
	Param,
	UseGuards,
	HttpStatus,
	HttpCode
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth
} from '@nestjs/swagger';
import { TenantPermissionGuard, PermissionGuard } from '@gauzy/core';
import { VknCompanySettingsService } from '../services';
import {
	CreateCompanySettingsDTO,
	UpdateCompanySettingsDTO,
	CompanySettingsResponseDTO
} from '../dto';

@ApiTags('VKN ERP Core')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard, PermissionGuard)
@Controller('vkn-erp/core/company-settings')
export class VknCompanySettingsController {
	constructor(
		private readonly companySettingsService: VknCompanySettingsService
	) {}

	@ApiOperation({ summary: 'Get company settings by organization' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Company settings retrieved successfully',
		type: CompanySettingsResponseDTO
	})
	@Get(':organizationId')
	async getByOrganization(
		@Param('organizationId') organizationId: string
	) {
		return await this.companySettingsService.getByOrganization(organizationId);
	}

	@ApiOperation({ summary: 'Create or update company settings' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Company settings saved successfully',
		type: CompanySettingsResponseDTO
	})
	@Post(':organizationId')
	@HttpCode(HttpStatus.OK)
	async upsert(
		@Param('organizationId') organizationId: string,
		@Body() dto: CreateCompanySettingsDTO
	) {
		// In real implementation, get tenantId from request context
		const tenantId = 'default-tenant-id'; // TODO: Get from RequestContext
		return await this.companySettingsService.upsert(organizationId, tenantId, dto);
	}

	@ApiOperation({ summary: 'Update company settings' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Company settings updated successfully',
		type: CompanySettingsResponseDTO
	})
	@Put(':organizationId')
	async update(
		@Param('organizationId') organizationId: string,
		@Body() dto: UpdateCompanySettingsDTO
	) {
		const tenantId = 'default-tenant-id'; // TODO: Get from RequestContext
		return await this.companySettingsService.upsert(organizationId, tenantId, dto);
	}

	@ApiOperation({ summary: 'Update feature flags' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Feature flags updated successfully'
	})
	@Put(':id/features')
	async updateFeatures(
		@Param('id') id: string,
		@Body() features: Record<string, boolean>
	) {
		return await this.companySettingsService.updateFeatures(id, features);
	}

	@ApiOperation({ summary: 'Update module enablement' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Module settings updated successfully'
	})
	@Put(':id/modules')
	async updateModules(
		@Param('id') id: string,
		@Body() modules: Record<string, boolean>
	) {
		return await this.companySettingsService.updateModules(id, modules);
	}

	@ApiOperation({ summary: 'Get supported currencies' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Supported currencies retrieved successfully',
		type: [String]
	})
	@Get(':organizationId/currencies')
	async getSupportedCurrencies(
		@Param('organizationId') organizationId: string
	) {
		return await this.companySettingsService.getSupportedCurrencies(organizationId);
	}
}
