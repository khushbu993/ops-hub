import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { InsufficientStockException } from './exceptions/insufficient-stock.exception';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      let totalCents = 0;
      const itemsData: {
        productId: number;
        quantity: number;
        unitPriceCents: number;
      }[] = [];

      // ধাপ ১: প্রতিটি item-এর জন্য stock পরীক্ষা ও দাম হিসাব
      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new InsufficientStockException(
            product.name,
            product.stock,
            item.quantity,
          );
        }

        totalCents += product.priceCents * item.quantity;
        itemsData.push({
          productId: product.id,
          quantity: item.quantity,
          unitPriceCents: product.priceCents,
        });
      }

      // ধাপ ২: Order তৈরি করুন
      const order = await tx.order.create({
        data: {
          userId: dto.userId,
          status: 'pending',
          totalCents,
          items: {
            create: itemsData,
          },
        },
        include: { items: true },
      });

      // ধাপ ৩: প্রতিটি product-এর stock কমান
      for (const item of dto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });
  }

  findAll() {
    return this.prisma.order.findMany({ include: { items: true } });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }
}