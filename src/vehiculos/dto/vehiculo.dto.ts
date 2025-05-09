import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

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

    @IsString()
    @IsOptional()
    Color?: string;

    @IsNumber()
    @IsOptional()
    Kilometraje?: number;

    @IsNumber()
    @IsNotEmpty()
    ClienteID: number;
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

    @IsOptional()
    @IsString()
    Color?: string;

    @IsNumber()
    @IsNotEmpty()
    ClienteID: number;

    @IsNumber()
    @IsOptional()
    Kilometraje?: number;
}