import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknCompanySettings } from '../entities';
import { CreateCompanySettingsDTO, UpdateCompanySettingsDTO } from '../dto';

@Injectable()
export class VknCompanySettingsService extends TenantAwareCrudService<VknCompanySettings> {
	constructor(
		@InjectRepository(VknCompanySettings)
		protected readonly repository: Repository<VknCompanySettings>
	) {
		super(repository);
	}

	/**
	 * Get company settings by organization ID
	 * @param organizationId Organization ID
	 * @returns Company settings
	 */
	async getByOrganization(organizationId: string): Promise<VknCompanySettings> {
		const settings = await this.repository.findOne({
			where: { organizationId }
		});

		if (!settings) {
			throw new NotFoundException(`Company settings not found for organization ${organizationId}`);
		}

		return settings;
	}

	/**
	 * Create or update company settings
	 * @param organizationId Organization ID
	 * @param tenantId Tenant ID
	 * @param dto Company settings data
	 * @returns Updated company settings
	 */
	async upsert(
		organizationId: string,
		tenantId: string,
		dto: CreateCompanySettingsDTO | UpdateCompanySettingsDTO
	): Promise<VknCompanySettings> {
		let settings = await this.repository.findOne({
			where: { organizationId, tenantId }
		});

		if (settings) {
			// Update existing settings
			Object.assign(settings, dto);
		} else {
			// Create new settings
			settings = this.repository.create({
				...dto,
				organizationId,
				tenantId
			});
		}

		return await this.repository.save(settings);
	}

	/**
	 * Get active company settings
	 * @param tenantId Tenant ID
	 * @returns List of active company settings
	 */
	async getActiveSettings(tenantId: string): Promise<VknCompanySettings[]> {
		return await this.repository.find({
			where: {
				tenantId,
				isActive: true
			}
		});
	}

	/**
	 * Update feature flags
	 * @param id Settings ID
	 * @param features Feature flags
	 * @returns Updated settings
	 */
	async updateFeatures(
		id: string,
		features: Record<string, boolean>
	): Promise<VknCompanySettings> {
		const settings = await this.repository.findOne({ where: { id } });

		if (!settings) {
			throw new NotFoundException(`Company settings with ID ${id} not found`);
		}

		settings.features = {
			...settings.features,
			...features
		};

		return await this.repository.save(settings);
	}

	/**
	 * Update module enablement
	 * @param id Settings ID
	 * @param modules Module flags
	 * @returns Updated settings
	 */
	async updateModules(
		id: string,
		modules: Record<string, boolean>
	): Promise<VknCompanySettings> {
		const settings = await this.repository.findOne({ where: { id } });

		if (!settings) {
			throw new NotFoundException(`Company settings with ID ${id} not found`);
		}

		settings.modules = {
			...settings.modules,
			...modules
		};

		return await this.repository.save(settings);
	}

	/**
	 * Get supported currencies
	 * @param organizationId Organization ID
	 * @returns List of currency codes
	 */
	async getSupportedCurrencies(organizationId: string): Promise<string[]> {
		const settings = await this.getByOrganization(organizationId);
		return settings.supportedCurrencies || [];
	}
}
