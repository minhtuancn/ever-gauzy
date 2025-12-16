import {
	Entity,
	Column,
	Index,
	ManyToOne,
	JoinColumn,
	RelationId
} from 'typeorm';
import {
	ICompanySettings,
	ICurrency,
	IOrganization
} from '@gauzy/contracts';
import {
	Organization,
	TenantOrganizationBaseEntity
} from '@gauzy/core';

/**
 * Company Settings Entity for VKN ERP
 * Stores comprehensive company configuration and preferences
 */
@Entity('vkn_company_settings')
export class VknCompanySettings extends TenantOrganizationBaseEntity implements ICompanySettings {
	@Index()
	@Column()
	name: string;

	// Business Information
	@Column({ nullable: true })
	legalName?: string;

	@Column({ nullable: true })
	taxId?: string;

	@Column({ nullable: true })
	registrationNumber?: string;

	@Column({ nullable: true })
	website?: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	fax?: string;

	// Address Information
	@Column({ type: 'text', nullable: true })
	address?: string;

	@Column({ nullable: true })
	city?: string;

	@Column({ nullable: true })
	state?: string;

	@Column({ nullable: true })
	country?: string;

	@Column({ nullable: true })
	postalCode?: string;

	// Financial Settings
	@Column({ nullable: true })
	defaultCurrency?: string;

	@Column({ type: 'simple-json', nullable: true })
	supportedCurrencies?: string[];

	@Column({ nullable: true })
	fiscalYearStart?: string;

	@Column({ default: 2 })
	decimalPlaces: number;

	// Localization
	@Column({ default: 'vi' })
	defaultLanguage: string;

	@Column({ default: 'Asia/Ho_Chi_Minh' })
	timezone: string;

	@Column({ default: 'DD/MM/YYYY' })
	dateFormat: string;

	@Column({ default: 'HH:mm' })
	timeFormat: string;

	// Logo and Branding
	@Column({ type: 'text', nullable: true })
	logoUrl?: string;

	@Column({ type: 'text', nullable: true })
	faviconUrl?: string;

	@Column({ nullable: true })
	primaryColor?: string;

	@Column({ nullable: true })
	secondaryColor?: string;

	// Document Settings
	@Column({ nullable: true })
	invoicePrefix?: string;

	@Column({ default: 1 })
	invoiceStartNumber: number;

	@Column({ nullable: true })
	quotationPrefix?: string;

	@Column({ default: 1 })
	quotationStartNumber: number;

	@Column({ nullable: true })
	purchaseOrderPrefix?: string;

	@Column({ default: 1 })
	purchaseOrderStartNumber: number;

	// Email Settings
	@Column({ nullable: true })
	smtpHost?: string;

	@Column({ nullable: true, type: 'int' })
	smtpPort?: number;

	@Column({ nullable: true })
	smtpUsername?: string;

	@Column({ nullable: true })
	smtpPassword?: string;

	@Column({ default: false })
	smtpSecure: boolean;

	@Column({ nullable: true })
	emailFromAddress?: string;

	@Column({ nullable: true })
	emailFromName?: string;

	// System Settings
	@Column({ type: 'simple-json', nullable: true })
	features?: Record<string, boolean>;

	@Column({ type: 'simple-json', nullable: true })
	modules?: Record<string, boolean>;

	@Column({ type: 'simple-json', nullable: true })
	customSettings?: Record<string, any>;

	// Multi-tenant
	@Column({ default: false })
	isActive: boolean;

	@Column({ nullable: true })
	subscriptionPlan?: string;

	@Column({ nullable: true, type: 'timestamp' })
	subscriptionExpiresAt?: Date;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * Organization
	 */
	@ManyToOne(() => Organization, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	organization?: IOrganization;

	@RelationId((it: VknCompanySettings) => it.organization)
	@Index()
	@Column()
	organizationId?: string;
}
