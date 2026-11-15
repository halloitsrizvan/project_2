import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service.js';

/** Vercel Cron hits this on serverless deployments, where the in-process @Cron timer cannot run. */
@ApiExcludeController() @Controller('cron') export class CronController {
  constructor(private notifications: NotificationsService) {}
  @Get('run') async run(@Headers('authorization') authorization?: string) {
    const secret = process.env.CRON_SECRET;
    if (!secret || authorization !== `Bearer ${secret}`) throw new UnauthorizedException();
    await this.notifications.runDue();
    return { ok: true };
  }
}
