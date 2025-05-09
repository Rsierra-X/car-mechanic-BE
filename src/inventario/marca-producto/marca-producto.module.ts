import { Module } from '@nestjs/common';
import { MarcaProductoService } from './marca-producto.service';
import { MarcaProductoController } from './marca-producto.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MarcaProducto} from "../entities/marca-producto.entity/marca-producto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MarcaProducto])],
  providers: [MarcaProductoService],
  controllers: [MarcaProductoController]
})
export class MarcaProductoModule {}
