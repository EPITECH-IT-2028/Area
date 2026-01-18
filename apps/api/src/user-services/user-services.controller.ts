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

interface RequestWithUser {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Controller('user-services')
@UseGuards(JwtAuthGuard)
export class UserServicesController {
  constructor(private readonly userServicesService: UserServicesService) {}

  @Get()
  async getUserServices(@Request() req: RequestWithUser) {
    const userId = req.user.id;
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
    @Request() req: RequestWithUser,
    @Param('serviceId') serviceId: string,
  ) {
    const userId = req.user.id;
    const service = await this.userServicesService.findUserService(
      userId,
      serviceId,
    );

    if (!service) {
      return {
        success: false,
        data: null,
        message: 'Service not connected',
      };
    }

    const sanitized = {
      id: service.id,
      service_id: service.service_id,
      is_connected: service.is_connected,
      created_at: service.created_at,
    };

    return {
      success: true,
      data: sanitized,
    };
  }

  @Delete(':id')
  async disconnectService(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    const userId = req.user.id;

    const userService =
      await this.userServicesService.findUserServicesByUser(userId);

    const serviceToDisconnect = userService.find((s) => s.id === id);

    if (!serviceToDisconnect || serviceToDisconnect.user_id !== userId) {
      throw new Error('Service not found or not owned by user');
    }

    const result = await this.userServicesService.disconnect(id);

    return {
      success: true,
      data: result,
      message: 'Service disconnected successfully',
    };
  }
}