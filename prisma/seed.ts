import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'john.doe@company.com',
        name: 'John Doe',
        password: await bcrypt.hash('password@123', 10),
      },
      {
        email: 'jane.doe@business.com',
        name: 'Jane Doe',
        password: await bcrypt.hash('secret#word', 10),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
