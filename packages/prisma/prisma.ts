import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client.js";

/**
 * Prismaクライアントを作成する関数
 * @param connectionString データベース接続文字列
 * @return PrismaClientのインスタンス
 */
export function createPrismaClient(connectionString: string) {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export type { PrismaClient };
