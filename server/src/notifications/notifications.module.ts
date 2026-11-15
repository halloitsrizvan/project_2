import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module.js';
import { BookingsModule } from '../bookings/bookings.module.js';
import { NotificationsController } from './notifications.controller.js';
import { CronController } from './cron.controller.js';
import { NotificationsService } from './notifications.service.js';
@Module({ imports: [EventsModule, BookingsModule], controllers: [NotificationsController, CronController], providers: [NotificationsService] }) export class NotificationsModule {}
