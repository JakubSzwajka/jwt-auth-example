import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
