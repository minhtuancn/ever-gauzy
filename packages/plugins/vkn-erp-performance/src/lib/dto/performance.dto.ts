import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePerformanceDTO {
  @ApiProperty({ type: () => String, maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: () => String, default: 'active' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdatePerformanceDTO extends CreatePerformanceDTO {}
