import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, Min } from 'class-validator';

export class CreateOrderDTO {
    @IsDate()
    @IsNotEmpty()
    orderDate: Date;

    @IsNumber()
    @IsNotEmpty()
    clientId: number;

    @IsString()
    @IsNotEmpty()
    clientName: string;

    @IsString()
    @IsNotEmpty()
    clientNit: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    plate: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsString()
    nextService?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => OrderDetailDTO)
    orderDetails: OrderDetailDTO[];

    @IsNumber()
    @Min(0)
    laborCost: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    abono?: number;

    @IsString()
    estado: string;
}

export class UpdateOrderDTO {
    @IsOptional()
    @IsDate()
    orderDate?: Date;

    @IsOptional()
    @IsNumber()
    clientId?: number;

    @IsOptional()
    @IsString()
    clientName?: string;

    @IsOptional()
    @IsString()
    clientNit?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    plate?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsString()
    nextService?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDTO)
    orderDetails?: OrderDetailDTO[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    laborCost?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    abono?: number;

    @IsOptional()
    @IsString()
    estado?: string;
}


export class OrderDetailDTO {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    unitPrice: number;
}