import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculosListaDto } from './create-vehiculos-lista.dto';

export class UpdateVehiculosListaDto extends PartialType(CreateVehiculosListaDto) {}