import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateVehiculoDTO {
    @IsString()
    @IsOptional()
    Marca?: string;

    @IsString()
    @IsOptional()
    Modelo?: string;

    @IsNumber()
    @IsOptional()
    Anio?: number;

    @IsString()
    @IsOptional()
    Placa?: string;
}

export class UpdateVehiculoDTO {
    @IsOptional()
    @IsString()
    Marca?: string;

    @IsOptional()
    @IsString()
    Modelo?: string;

    @IsOptional()
    @IsNumber()
    Anio?: number;

    @IsOptional()
    @IsString()
    Placa?: string;
}