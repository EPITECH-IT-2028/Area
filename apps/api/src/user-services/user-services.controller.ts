import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserServicesService } from './user-services.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-services')
@UseGuards(JwtAuthGuard)
export class UserServicesController {
  constructor(private readonly userServicesService: UserServicesService) {}

  @Get()
  async getUserServices(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub as string;
    const services =
      await this.userServicesService.findUserServicesByUser(userId);

    // We don't want to expose sensitive informations
    const sanitized = services.map((service) => ({
      id: service.id,
      service_id: service.service_id,
      is_connected: service.is_connected,
      last_sync: service.last_sync,
      created_at: service.created_at,
      service: service.service,
    }));

    return {
      success: true,
      data: sanitized,
    };
  }

  @Get(':serviceId')
  async getUserService(
    @Request() req: any,
    @Param('serviceId') serviceId: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub as string;
    const service = await this.userServicesService.findUserService(
      userId,
      serviceId,
    );

    return {
      success: true,
      data: service,
    };
  }

  @Delete(':id')
  async disconnectService(@Param('id') id: string) {
    const result = await this.userServicesService.disconnect(id);

    return {
      success: true,
      data: result,
      message: 'Service disconnected successfully',
    };
  }
}
