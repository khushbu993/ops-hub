import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding বন্ধ করা শুরু হচ্ছে...');

  // পুরনো ডেটা পরিষ্কার করুন (নির্ভরতার উল্টো ক্রমে)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'kim@example.com',
      passwordHash: 'temp-hash',
      name: 'Khushbu Islam Misbah',
    },
  });

  const keyboard = await prisma.product.create({
    data: { name: 'Keyboard', priceCents: 2500, stock: 10 },
  });

  const mouse = await prisma.product.create({
    data: { name: 'Mouse', priceCents: 1200, stock: 20 },
  });

  const monitor = await prisma.product.create({
    data: { name: 'Monitor', priceCents: 15000, stock: 5 },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: 'paid',
      totalCents: keyboard.priceCents + mouse.priceCents,
      items: {
        create: [
          { productId: keyboard.id, quantity: 1, unitPriceCents: keyboard.priceCents },
          { productId: mouse.id, quantity: 1, unitPriceCents: mouse.priceCents },
        ],
      },
    },
  });

  console.log('Seed সম্পন্ন:', { user: user.email, order: order.id, products: 3 });
}

main()
  .catch((e) => {
    console.error('Seed ব্যর্থ:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });