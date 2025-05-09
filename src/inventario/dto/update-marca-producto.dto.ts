import {PartialType} from "@nestjs/mapped-types";
import {CreateMarcaProductoDto} from "./create-marca-producto.dto";
import {IsNotEmpty} from "class-validator";

export class UpdateMarcaProductoDto {
   @IsNotEmpty()
    id: number
}