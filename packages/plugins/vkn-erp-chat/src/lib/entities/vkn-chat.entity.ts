import { Entity, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';
import { TenantOrganizationBaseEntity } from '@gauzy/core';

@Entity('vkn_chat_entity')
export class VknChatEntity extends TenantOrganizationBaseEntity {
  @ApiProperty({ type: () => String })
  @IsString()
  @MaxLength(255)
  @Column()
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ApiProperty({ type: () => String, default: 'active' })
  @IsString()
  @Column({ default: 'active' })
  status: string;
}
