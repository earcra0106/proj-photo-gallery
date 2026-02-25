import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

/**
 * サーバ起動時に最初に呼び出される関数
 */
async function bootstrap() {
  // NestJSアプリケーションの作成
  const app = await NestFactory.create(AppModule);

  // 型安全な設定サービスを取得
  const config = app.get(AppConfigService);

  console.log(`Starting server on port ${config.port} (${config.nodeEnv})...`);
  await app.listen(config.port);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
