import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@common/decorators/public.decorator';
import { ApiAcceptedResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getRoot(): string {
    return this.appService.getHello();
  }

  @Get('favicon.ico')
  handleFavicon() {
    return '';
  }
}
