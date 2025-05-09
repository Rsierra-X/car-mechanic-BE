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

export class CreateOrderDto {
    @IsNumber()
    clientId: number;

    // Datos del vehículo
    @IsString() marca: string;
    @IsString() modelo: string;
    @IsNumber() anio: number;
    @IsString() color: string;
    @IsString() placa: string;
    @IsNumber() kilometraje: number;

    // Datos financieros
    @IsNumber() manoDeObra: number;
    @IsNumber() abono: number;
    @IsNumber() total: number;

    // Detalle
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    orderDetails: CreateOrderDetailDto[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}