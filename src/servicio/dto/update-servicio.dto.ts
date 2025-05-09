import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class UpdateServicioDto {
    @IsOptional()
    @IsString()
    Nombre?: string;

    @IsOptional()
    @IsString()
    Descripcion?: string;

    @IsOptional()
    @IsEnum(['propio', 'tercero'])
    Tipo?: 'propio' | 'tercero';
}