import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDevUsers() {
  await prisma.user.create({
    data: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      password: await bcrypt.hash('password@123', 10),
      role: 'ADMIN',
    },
  });
  // Add more dev seed data here...
}

async function seedTestUsers() {
  await prisma.user.create({
    data: {
      email: 'jane.doe@business.com',
      name: 'Jane Doe',
      password: await bcrypt.hash('secret#word', 10),
    },
  });
  // Add minimal test seed data here...
}

async function main() {
  const env = process.env.NODE_ENV || 'development';

  if (env === 'development') {
    await seedDevUsers();
  } else if (env === 'test') {
    await seedTestUsers();
  } else {
    console.log(`No seeding for environment: ${env}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed');
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
