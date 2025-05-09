import { Module } from '@nestjs/common';
import {Cliente} from "../clientes/entities/cliente.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Vehiculo} from "./entities/vehiculos.entity";
import {VehiculoService} from "./vehiculos.service";
import {VehiculoController} from "./vehiculos.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, Cliente])], // Registra la entidad Vehiculo aquí
  providers: [VehiculoService], // Proveedor del servicio VehiculoService
  exports: [VehiculoService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class VehiculosModule {}
