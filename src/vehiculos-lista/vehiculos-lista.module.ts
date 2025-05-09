import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosListaService } from './vehiculos-lista.service';
import { VehiculosListaController } from './vehiculos-lista.controller';
import {VehiculoLista} from "./entities/vehiculo-lista.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoLista])],
  providers: [VehiculosListaService],
  controllers: [VehiculosListaController]
})
export class VehiculosListaModule {}
