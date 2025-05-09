import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
    Min,
    IsDateString, IsInt
} from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";
import {CreateOrderDetailDto} from "../../detalle-orden/dto/order-detail.dto";

class VehiculoDto {
    @IsNotEmpty()
    Placa: string;

    @IsNotEmpty()
    Marca: string;

    @IsNotEmpty()
    Modelo: string;

    @IsNumber()
    Anio: number;

    @IsNotEmpty()
    Color: string;

    @IsNumber()
    Kilometraje: number;
}

export class CreateOrderDto {
    @IsNumber()
    clienteId: number;

    @ValidateNested()
    @Type(() => VehiculoDto)
    vehiculo: VehiculoDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    detalles: CreateOrderDetailDto[];

    @IsNumber()
    manoDeObra: number;

    @IsNumber()
    abono: number;

    @IsNumber()
    total: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class OrderToCreate {
    @IsNumber()
    clienteId: number;

    @IsNumber()
    vehiculoId: number;
}

