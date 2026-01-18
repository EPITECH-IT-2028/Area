import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Patch,
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

  @Get('user')
  async getAreaByUserId(@Req() req: any) {
    const userId = req.user.id as string;

    const area = await this.areasService.getAreaByUserId(userId);
    return {
      success: true,
      data: area,
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id as string;
    await this.areasService.delete(id, userId);
  }

  @Patch(':id/name')
  async modifyName(
    @Param('id') id: string,
    @Body('name') name: string,
    @Req() req: any,
  ) {
    const userId = req.user.id as string;
    const area = await this.areasService.modifyName(id, userId, name);
    return {
      success: true,
      data: area,
      message: 'Area name modified successfully',
    };
  }

  @Patch(':id/status')
  async modifyStatus(
    @Param('id') id: string,
    @Body('is_active') isActive: boolean,
    @Req() req: any,
  ) {
    const userId = req.user.id as string;
    const area = await this.areasService.modifyStatus(id, userId, isActive);
    return {
      success: true,
      data: area,
      message: 'Area status modified successfully',
    };
  }

  @Patch(':id/description')
  async modifyDescription(
    @Param('id') id: string,
    @Body('description') description: string,
    @Req() req: any,
  ) {
    const userId = req.user.id as string;
    const area = await this.areasService.modifyDescription(id, userId, description);
    return {
      success: true,
      data: area,
      message: 'Area description modified successfully',
    };
  }
}
