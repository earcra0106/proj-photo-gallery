import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AppConfigModule } from '@/config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
