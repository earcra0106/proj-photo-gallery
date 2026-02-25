import { Injectable, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import * as ConfigRegister from 'config/config.register';

/**
 * 型安全な設定サービス
 */
@Injectable()
export class AppConfigService {
  constructor(
    @Inject(ConfigRegister.serverConfig.KEY)
    private serverConfig: ConfigType<typeof ConfigRegister.serverConfig>,
    @Inject(ConfigRegister.databaseConfig.KEY)
    private databaseConfig: ConfigType<typeof ConfigRegister.databaseConfig>,
  ) {}

  /**
   * サーバーのポート番号
   */
  get port(): number {
    return this.serverConfig.port;
  }

  /**
   * 実行環境
   */
  get nodeEnv(): 'development' | 'production' | 'test' {
    return this.serverConfig.nodeEnv;
  }

  /**
   * データベース接続URL
   */
  get databaseUrl(): string {
    const { username, password, host, port, dbname } = this.databaseConfig;

    return `postgresql://${username}:${password}@${host}:${port}/${dbname}`;
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
