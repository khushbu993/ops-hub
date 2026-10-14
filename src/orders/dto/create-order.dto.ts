import { Type } from 'class-transformer';
import { IsInt, IsArray, ValidateNested, ArrayMinSize, Min } from 'class-validator';

class OrderItemInput {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];
}