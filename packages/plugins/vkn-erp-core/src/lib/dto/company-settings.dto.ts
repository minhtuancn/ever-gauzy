import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsOptional,
	IsEmail,
	IsUrl,
	IsNumber,
	IsBoolean,
	IsObject,
	IsArray,
	Min
} from 'class-validator';

export class CreateCompanySettingsDTO {
	@ApiProperty({ description: 'Company name' })
	@IsString()
	name: string;

	@ApiPropertyOptional({ description: 'Legal company name' })
	@IsOptional()
	@IsString()
	legalName?: string;

	@ApiPropertyOptional({ description: 'Tax identification number' })
	@IsOptional()
	@IsString()
	taxId?: string;

	@ApiPropertyOptional({ description: 'Business registration number' })
	@IsOptional()
	@IsString()
	registrationNumber?: string;

	@ApiPropertyOptional({ description: 'Company website' })
	@IsOptional()
	@IsUrl()
	website?: string;

	@ApiPropertyOptional({ description: 'Company email' })
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiPropertyOptional({ description: 'Company phone' })
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiPropertyOptional({ description: 'Company address' })
	@IsOptional()
	@IsString()
	address?: string;

	@ApiPropertyOptional({ description: 'City' })
	@IsOptional()
	@IsString()
	city?: string;

	@ApiPropertyOptional({ description: 'State/Province' })
	@IsOptional()
	@IsString()
	state?: string;

	@ApiPropertyOptional({ description: 'Country' })
	@IsOptional()
	@IsString()
	country?: string;

	@ApiPropertyOptional({ description: 'Postal code' })
	@IsOptional()
	@IsString()
	postalCode?: string;

	@ApiPropertyOptional({ description: 'Default currency code (e.g., VND, USD)' })
	@IsOptional()
	@IsString()
	defaultCurrency?: string;

	@ApiPropertyOptional({ description: 'Supported currency codes', type: [String] })
	@IsOptional()
	@IsArray()
	supportedCurrencies?: string[];

	@ApiPropertyOptional({ description: 'Fiscal year start month (MM-DD format)' })
	@IsOptional()
	@IsString()
	fiscalYearStart?: string;

	@ApiPropertyOptional({ description: 'Decimal places for currency', default: 2 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	decimalPlaces?: number;

	@ApiPropertyOptional({ description: 'Default language code', default: 'vi' })
	@IsOptional()
	@IsString()
	defaultLanguage?: string;

	@ApiPropertyOptional({ description: 'Timezone', default: 'Asia/Ho_Chi_Minh' })
	@IsOptional()
	@IsString()
	timezone?: string;

	@ApiPropertyOptional({ description: 'Date format', default: 'DD/MM/YYYY' })
	@IsOptional()
	@IsString()
	dateFormat?: string;

	@ApiPropertyOptional({ description: 'Time format', default: 'HH:mm' })
	@IsOptional()
	@IsString()
	timeFormat?: string;

	@ApiPropertyOptional({ description: 'Logo URL' })
	@IsOptional()
	@IsString()
	logoUrl?: string;

	@ApiPropertyOptional({ description: 'Primary brand color' })
	@IsOptional()
	@IsString()
	primaryColor?: string;

	@ApiPropertyOptional({ description: 'Invoice number prefix' })
	@IsOptional()
	@IsString()
	invoicePrefix?: string;

	@ApiPropertyOptional({ description: 'Invoice starting number', default: 1 })
	@IsOptional()
	@IsNumber()
	@Min(1)
	invoiceStartNumber?: number;

	@ApiPropertyOptional({ description: 'Feature flags', type: 'object' })
	@IsOptional()
	@IsObject()
	features?: Record<string, boolean>;

	@ApiPropertyOptional({ description: 'Module enablement', type: 'object' })
	@IsOptional()
	@IsObject()
	modules?: Record<string, boolean>;

	@ApiPropertyOptional({ description: 'Custom settings', type: 'object' })
	@IsOptional()
	@IsObject()
	customSettings?: Record<string, any>;

	@ApiPropertyOptional({ description: 'Active status', default: true })
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}

export class UpdateCompanySettingsDTO extends CreateCompanySettingsDTO {
	@ApiPropertyOptional({ description: 'Company settings ID' })
	@IsOptional()
	@IsString()
	id?: string;
}

export class CompanySettingsResponseDTO {
	@ApiProperty()
	id: string;

	@ApiProperty()
	name: string;

	@ApiPropertyOptional()
	legalName?: string;

	@ApiPropertyOptional()
	taxId?: string;

	@ApiPropertyOptional()
	email?: string;

	@ApiPropertyOptional()
	phone?: string;

	@ApiPropertyOptional()
	address?: string;

	@ApiPropertyOptional()
	defaultCurrency?: string;

	@ApiPropertyOptional()
	defaultLanguage?: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
