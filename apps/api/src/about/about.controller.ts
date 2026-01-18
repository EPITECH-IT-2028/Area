import { Controller, Get, Ip, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AboutService } from './about.service';
import type { Request } from 'express';

@Controller('about.json')
@UseGuards(JwtAuthGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAboutInfo(@Ip() clientIp: string, @Req() req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;
    return this.aboutService.getAboutInfo(clientIp, baseUrl);
  }
}
