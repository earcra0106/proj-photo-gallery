import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AppConfig } from './configuration';

/**
 * 型安全な設定サービス
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<AppConfig, true>) {}

  /**
   * サーバーのポート番号を取得
   */
  get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  /**
   * 実行環境を取得
   */
  get nodeEnv(): 'development' | 'production' | 'test' {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  /**
   * データベース接続URLを取得
   */
  get databaseUrl(): string {
    const username = this.configService.get('DATABASE_USERNAME', {
      infer: true,
    });
    const password = this.configService.get('DATABASE_PASSWORD', {
      infer: true,
    });
    const host = this.configService.get('DATABASE_HOST', { infer: true });
    const port = this.configService.get('DATABASE_PORT', { infer: true });
    const database = this.configService.get('DATABASE_NAME', { infer: true });

    return `postgresql://${username}:${password}@${host}:${port}/${database}`;
  }

  /**
   * 開発環境かどうかを判定
   */
  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  /**
   * 本番環境かどうかを判定
   */
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  /**
   * テスト環境かどうかを判定
   */
  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }
}
