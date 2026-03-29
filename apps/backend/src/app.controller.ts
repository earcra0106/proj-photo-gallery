import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * データベースからユーザー情報を取得し、文字列として返す
   * @return {string} - ユーザー情報の文字列
   */
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
