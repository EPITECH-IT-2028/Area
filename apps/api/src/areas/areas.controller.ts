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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({
    example: 'Weather Alert',
    description: 'The name of the area',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Sends an alert when it rains in Bordeaux',
    description: 'A description of the area',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the area is active',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    example: 'open_meteo',
    description: 'The name of the action service',
  })
  @IsString()
  @IsNotEmpty()
  action_name: string;

  @ApiPropertyOptional({
    example: {
      latitude: 44.8378,
      longitude: -0.5792,
      condition: { type: 'temp_above', threshold: 0 },
    },
    description: 'Configuration for the action',
  })
  @IsObject()
  @IsOptional()
  action_config?: Record<string, any>;

  @ApiProperty({
    example: 'send_webhook_message',
    description: 'The name of the reaction service',
  })
  @IsString()
  @IsNotEmpty()
  reaction_name: string;

  @ApiPropertyOptional({
    example: {
      webhook_url: 'https://discord.com/api/webhooks/...',
      message_template: 'Temperature is {{matchedValue}}°C',
    },
    description: 'Configuration for the reaction',
  })
  @IsObject()
  @IsOptional()
  reaction_config?: Record<string, any>;
}

@ApiTags('areas')
@ApiBearerAuth()
@Controller('areas')
@UseGuards(JwtAuthGuard)
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @ApiOperation({ summary: 'Get all active areas' })
  @ApiResponse({
    status: 200,
    description: 'List of all active areas.',
  })
  @Get()
  async getAllActiveAreas() {
    const areas = await this.areasService.getAllActiveAreas();
    return {
      success: true,
      data: areas,
    };
  }

  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({
    status: 201,
    description: 'The area has been successfully created.',
    type: CreateAreaDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
