import {IsNotEmpty, IsString} from "class-validator";

export class CreateMarcaProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}