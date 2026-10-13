import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  priceCents: number;

  @IsInt()
  @Min(0)
  stock: number;
}