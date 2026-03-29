import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // backendのCI環境では代入されないため、値なしでも動作する
    url: process.env.DATABASE_URL,
  },
});
