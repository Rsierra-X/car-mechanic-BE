import {IsNotEmpty, IsString} from "class-validator";

export class CreateTipoProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}