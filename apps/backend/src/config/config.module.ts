import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { databaseConfig, serverConfig } from 'config/config.register';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serverConfig, databaseConfig],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
