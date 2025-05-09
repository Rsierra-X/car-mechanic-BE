import { Module } from '@nestjs/common';
import { TipoProductoService } from './tipo-producto.service';
import { TipoProductoController } from './tipo-producto.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TipoProducto} from "../entities/tipo-producto.entity/tipo-producto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TipoProducto])],
  providers: [TipoProductoService],
  controllers: [TipoProductoController]
})
export class TipoProductoModule {}
