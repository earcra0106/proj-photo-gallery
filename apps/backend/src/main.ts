import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// サーバ起動時に最初に呼び出される関数
async function bootstrap() {
  // 環境変数の読み込み (.envファイルの読み込みを含む)
  const configService = new ConfigService();

  // 公開するポートを環境変数から取得し、デフォルトは3000に設定
  const port = configService.get<number>('PORT') ?? 3000;

  // NestJSアプリケーションの作成
  const app = await NestFactory.create(AppModule);
  console.log('Starting server... (PORT: ' + port + ')');
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
