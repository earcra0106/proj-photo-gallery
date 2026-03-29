import { createPrismaClient } from "../prisma";
import { config } from "dotenv";

config();

async function main() {
  const prisma = createPrismaClient(process.env.DATABASE_URL ?? "");
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      posts: {
        create: {
          title: "Check out Prisma with Next.js",
          content: "https://www.prisma.io/nextjs",
          published: true,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: "https://twitter.com/prisma",
            published: true,
          },
          {
            title: "Follow Nexus on Twitter",
            content: "https://twitter.com/nexusgql",
            published: true,
          },
        ],
      },
    },
  });
  console.log("seedが完了しました");
  console.log("user count: ", await prisma.user.count());
  console.log("post count: ", await prisma.post.count());

  prisma.$disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
