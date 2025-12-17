import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknAttendanceService } from '../services';
import { VknAttendanceEntity } from '../entities';
import { CreateAttendanceDTO, UpdateAttendanceDTO } from '../dto';

@ApiTags('VKN ERP Attendance')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/attendance')
export class VknAttendanceController {
  constructor(private readonly service: VknAttendanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all attendance entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknAttendanceEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create attendance entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateAttendanceDTO): Promise<VknAttendanceEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attendance entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknAttendanceEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attendance entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceDTO
  ): Promise<VknAttendanceEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
