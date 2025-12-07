import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  Post,
  Body,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, IsObject } from 'class-validator';

export class CreateAreaDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;

  @IsUUID()
  @IsNotEmpty()
  action_id: string;

  @IsObject()
  @IsOptional()
  action_config?: Record<string, any>;

  @IsUUID()
  @IsNotEmpty()
  reaction_id: string;

  @IsObject()
  @IsOptional()
  reaction_config?: Record<string, any>;
}

@Controller('areas')
@UseGuards(JwtAuthGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('active')
  async getAllActiveAreas() {
    const areas = await this.areasService.getAllActiveAreas();
    return {
      success: true,
      data: areas,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAreaDto: CreateAreaDto) {
    const area = await this.areasService.create(createAreaDto);
    return {
      success: true,
      data: area,
      message: 'Area created successfully',
    };
  }
}