import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  action_name: string;

  @IsObject()
  @IsOptional()
  action_config?: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  reaction_name: string;

  @IsObject()
  @IsOptional()
  reaction_config?: Record<string, any>;
}

@Controller('areas')
@UseGuards(JwtAuthGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  async getAllActiveAreas() {
    const areas = await this.areasService.getAllActiveAreas();
    return {
      success: true,
      data: areas,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAreaDto: CreateAreaDto, @Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id as string;
    const area = await this.areasService.create(createAreaDto, userId);
    return {
      success: true,
      data: area,
      message: 'Area created successfully',
    };
  }
}
