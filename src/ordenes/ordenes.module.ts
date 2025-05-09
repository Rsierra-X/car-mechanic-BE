import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/orden.entity";
import {OrderService} from "./ordenes.service";
import {OrderController} from "./ordenes.controller";
import {OrderDetail} from "../detalle-orden/entities/orderDetail";
import {Cliente} from "../clientes/entities/cliente.entity";
import {Producto} from "../inventario/entities/producto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Cliente, Producto])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrdenesModule {}
