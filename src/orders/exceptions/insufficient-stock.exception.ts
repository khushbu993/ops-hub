import { BadRequestException } from '@nestjs/common';

export class InsufficientStockException extends BadRequestException {
  constructor(productName: string, available: number, requested: number) {
    super(`Insufficient stock for "${productName}": available ${available}, requested ${requested}`);
  }
}