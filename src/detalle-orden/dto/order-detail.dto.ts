import { IsEnum, IsInt, IsNumber, IsPositive, ValidateIf } from 'class-validator';

export class CreateOrderDetailDto {
    @IsInt()
    orderId: number;

    @IsEnum(['producto', 'servicio'])
    tipo: 'producto' | 'servicio';

    @ValidateIf(o => o.tipo === 'producto')
    @IsInt()
    productoId: number;

    @ValidateIf(o => o.tipo === 'servicio')
    @IsInt()
    servicioId: number;

    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    precioUnitario: number;
}

export class UpdateOrderDetailDto {
    @IsInt()
    orderId: number;

    @IsEnum(['producto', 'servicio'])
    tipo: 'producto' | 'servicio';

    @ValidateIf(o => o.tipo === 'producto')
    @IsInt()
    productoId: number;

    @ValidateIf(o => o.tipo === 'servicio')
    @IsInt()
    servicioId: number;

    @IsInt()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    precioUnitario: number;
}