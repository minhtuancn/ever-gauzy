import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknReportsService } from '../services';
import { VknReportsEntity } from '../entities';
import { CreateReportsDTO, UpdateReportsDTO } from '../dto';

@ApiTags('VKN ERP Reports')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/reports')
export class VknReportsController {
  constructor(private readonly service: VknReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknReportsEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create reports entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateReportsDTO): Promise<VknReportsEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reports entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknReportsEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update reports entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateReportsDTO
  ): Promise<VknReportsEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete reports entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
