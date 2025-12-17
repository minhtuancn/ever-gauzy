import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknContractsService } from '../services';
import { VknContractsEntity } from '../entities';
import { CreateContractsDTO, UpdateContractsDTO } from '../dto';

@ApiTags('VKN ERP Contracts')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/contracts')
export class VknContractsController {
  constructor(private readonly service: VknContractsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all contracts entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknContractsEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create contracts entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateContractsDTO): Promise<VknContractsEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contracts entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknContractsEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contracts entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateContractsDTO
  ): Promise<VknContractsEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contracts entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
