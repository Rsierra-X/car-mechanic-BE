import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import {Cliente} from "../clientes/entities/cliente.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Vehiculo} from "./entities/vehiculos.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, Cliente])],
  providers: [VehiculosService],
  controllers: [VehiculosController]
})
export class VehiculosModule {}
