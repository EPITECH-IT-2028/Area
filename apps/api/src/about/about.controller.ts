import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AboutService } from './about.service';

@Controller('about.json')
@UseGuards(JwtAuthGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAboutInfo(@Ip() clientIp: string) {
    return this.aboutService.getAboutInfo(clientIp);
  }
}
