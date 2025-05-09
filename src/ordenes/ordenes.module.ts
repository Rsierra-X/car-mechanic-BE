import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/orden.entity";
import {OrderService} from "./ordenes.service";
import {OrdersController} from "./ordenes.controller";
import {OrderDetail} from "../detalle-orden/entities/orderDetail";
import {Cliente} from "../clientes/entities/cliente.entity";
import {Producto} from "../inventario/entities/producto.entity";
import {Vehiculo} from "../vehiculos/entities/vehiculos.entity";
import {VehiculosModule} from "../vehiculos/vehiculos.module";
import {DetalleOrdenModule} from "../detalle-orden/detalle-orden.module";
import {ClientesModule} from "../clientes/clientes.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Vehiculo, Cliente, OrderDetail]),
    VehiculosModule, // Importa VehiculosModule
    ClientesModule,  // Importa ClientesModule
    DetalleOrdenModule, // Importa DetalleOrdenModule
  ],
  providers: [OrderService],
  controllers: [OrdersController],
})
export class OrdenesModule {}
