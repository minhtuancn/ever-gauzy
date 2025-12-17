import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknProductionService } from '../services';
import { VknProductionEntity } from '../entities';
import { CreateProductionDTO, UpdateProductionDTO } from '../dto';

@ApiTags('VKN ERP Production')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/production')
export class VknProductionController {
  constructor(private readonly service: VknProductionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all production entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknProductionEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create production entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateProductionDTO): Promise<VknProductionEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get production entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknProductionEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update production entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductionDTO
  ): Promise<VknProductionEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete production entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
