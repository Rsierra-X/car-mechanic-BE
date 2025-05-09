import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateServicioDto {
    @IsString()
    Nombre: string;

    @IsOptional()
    @IsString()
    Descripcion?: string;

    @IsEnum(['propio', 'tercero'])
    Tipo: 'propio' | 'tercero';
}