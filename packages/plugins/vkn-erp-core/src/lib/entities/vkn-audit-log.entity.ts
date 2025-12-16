import {
	Entity,
	Column,
	Index,
	ManyToOne,
	JoinColumn,
	RelationId
} from 'typeorm';
import {
	IAuditLog,
	IUser,
	IOrganization
} from '@gauzy/contracts';
import {
	TenantOrganizationBaseEntity,
	User,
	Organization
} from '@gauzy/core';

/**
 * Audit Log Entity for VKN ERP
 * Tracks all system activities and changes for compliance and security
 */
@Entity('vkn_audit_logs')
export class VknAuditLog extends TenantOrganizationBaseEntity implements IAuditLog {
	@Index()
	@Column()
	action: string;

	@Column()
	entity: string;

	@Column({ nullable: true })
	entityId?: string;

	@Column({ type: 'text', nullable: true })
	oldValue?: string;

	@Column({ type: 'text', nullable: true })
	newValue?: string;

	@Column({ type: 'simple-json', nullable: true })
	changes?: Record<string, any>;

	@Column({ nullable: true })
	ipAddress?: string;

	@Column({ nullable: true })
	userAgent?: string;

	@Column({ nullable: true })
	method?: string;

	@Column({ nullable: true, type: 'text' })
	url?: string;

	@Column({ nullable: true })
	statusCode?: number;

	@Column({ type: 'simple-json', nullable: true })
	metadata?: Record<string, any>;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	timestamp: Date;

	/*
	|--------------------------------------------------------------------------
	| @ManyToOne
	|--------------------------------------------------------------------------
	*/

	/**
	 * User who performed the action
	 */
	@ManyToOne(() => User, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	user?: IUser;

	@RelationId((it: VknAuditLog) => it.user)
	@Index()
	@Column({ nullable: true })
	userId?: string;

	/**
	 * Organization
	 */
	@ManyToOne(() => Organization, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	organization?: IOrganization;

	@RelationId((it: VknAuditLog) => it.organization)
	@Index()
	@Column()
	organizationId?: string;
}
