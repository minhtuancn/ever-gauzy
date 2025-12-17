import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknFarmService } from '../services';
import { VknFarmEntity } from '../entities';
import { CreateFarmDTO, UpdateFarmDTO } from '../dto';

@ApiTags('VKN ERP Farm')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/farm')
export class VknFarmController {
  constructor(private readonly service: VknFarmService) {}

  @Get()
  @ApiOperation({ summary: 'Get all farm entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknFarmEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create farm entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateFarmDTO): Promise<VknFarmEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get farm entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknFarmEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update farm entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFarmDTO
  ): Promise<VknFarmEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete farm entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
