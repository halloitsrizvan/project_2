import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module.js';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { EventsModule } from './events/events.module.js';
import { BookingsModule } from './bookings/bookings.module.js';
import { FoodModule } from './food/food.module.js';
import { PlannerModule } from './planner/planner.module.js';
import { CheckinModule } from './checkin/checkin.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { ParkingModule } from './parking/parking.module.js';
import { EquipmentModule } from './equipment/equipment.module.js';
import { MediaModule } from './media/media.module.js';
import { MailModule } from './mail/mail.module.js';

@Module({ imports: [
  ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(), JWT_SECRET: Joi.string().min(16).required(),
    JWT_EXPIRES_IN: Joi.string().default('1d'), CLIENT_URL: Joi.string().uri().required(),
    ADMIN_SIGNUP_CODE: Joi.string().min(8).required(), PORT: Joi.number().default(3000),
    SMTP_HOST: Joi.string().allow('').optional(), SMTP_PORT: Joi.number().optional(),
    SMTP_USER: Joi.string().allow('').optional(), SMTP_PASS: Joi.string().allow('').optional(), SMTP_FROM: Joi.string().allow('').optional(),
    CRON_SECRET: Joi.string().allow('').optional(), RESEND_API_KEY: Joi.string().allow('').optional(), MAIL_FROM: Joi.string().allow('').optional(), MAIL_REDIRECT_TO: Joi.string().allow('').optional(),
    CLOUDINARY_CLOUD_NAME: Joi.string().allow('').optional(), CLOUDINARY_API_KEY: Joi.string().allow('').optional(), CLOUDINARY_API_SECRET: Joi.string().allow('').optional(),
  }).unknown(true) }),
  ScheduleModule.forRoot(), ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
  PrismaModule, MailModule, HealthModule, AuthModule, EventsModule, BookingsModule, FoodModule,
  PlannerModule, CheckinModule, NotificationsModule, ReportsModule, ParkingModule, EquipmentModule, MediaModule,
], providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }] }) export class AppModule {}
