import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { AppConfigService } from '@/config/config.service';

/**
 * サーバ起動時に最初に呼び出される関数
 */
async function bootstrap() {
  // NestJSアプリケーションの作成
  const app = await NestFactory.create(AppModule);

  // CORS設定を有効化
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 型安全な設定サービスを取得
  const config = app.get(AppConfigService);

  console.log(`Starting server on port ${config.port} (${config.nodeEnv})...`);
  await app.listen(config.port);
}

bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
