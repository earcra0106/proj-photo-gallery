import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPrismaClient } from '@repo/prisma';
import type { PrismaClient } from '@repo/prisma';

/**
 * prismaの初期接続を行う
 *
 * DATABASE_URL環境変数が必要
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;

  constructor(private configService: ConfigService) {}

  /**
   * モジュール初期化時にPrismaクライアントを作成し、データベースに接続する
   * DATABASE_URL環境変数が設定されていない場合はエラーをスローする
   */
  async onModuleInit() {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl || typeof databaseUrl !== 'string') {
      throw new Error(
        'DATABASE_URL environment variable is not set or invalid',
      );
    }
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
