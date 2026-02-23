import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  /**
   * データベースからユーザー情報を取得し、文字列として返す
   * @return {string} - ユーザー情報の文字列
   */
  async getHello(): Promise<string> {
    const user = await this.prisma.getPrisma().user.findMany();
    if (!user || user.length === 0) {
      return 'User not found';
    }
    let result = 'Users:\n';
    user.forEach((u) => {
      result += `- ${u.name || 'No name'} (${u.email})\n`;
    });
    return result;
  }
}
