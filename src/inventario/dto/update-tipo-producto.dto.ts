import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoProductoDto } from './create-tipo-producto.dto';
import {IsNotEmpty} from "class-validator";

export class UpdateTipoProductoDto {
    @IsNotEmpty()
    id: number
}