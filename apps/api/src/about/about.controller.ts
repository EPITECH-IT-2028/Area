import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AboutService } from './about.service';
import type { Request } from 'express';

@Controller('about.json')
@UseGuards(JwtAuthGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAboutInfo(@Ip() clientHost: string) {
    return this.aboutService.getAboutInfo(clientHost);
  }
}
