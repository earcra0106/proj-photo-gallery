import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { createPrismaClient } from '@repo/prisma';
import type { PrismaClient } from '@repo/prisma';
import { AppConfigService } from '../config/config.service';

/**
 * prismaの初期接続を行う
 *
 * DATABASE_URL環境変数が必要
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;

  constructor(@Inject(AppConfigService) private config: AppConfigService) {}

  /**
   * モジュール初期化時にPrismaクライアントを作成し、データベースに接続する
   */
  async onModuleInit() {
    const databaseUrl = this.config.databaseUrl;
    this.prismaClient = createPrismaClient(databaseUrl);
    await this.prismaClient.$connect();
  }

  /**
   * モジュール破棄時にPrismaクライアントの接続を切断する
   */
  async onModuleDestroy() {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
    }
  }

  /**
   * Prismaクライアントのインスタンスを返す
   * @returns PrismaClientのインスタンス
   */
  getPrisma() {
    return this.prismaClient;
  }
}
