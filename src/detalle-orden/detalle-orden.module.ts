import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderDetail} from "./entities/orderDetail";
import {Order} from "../ordenes/entities/orden.entity";
import { DetalleOrdenService } from './detalle-orden.service';
import { DetalleOrdenController } from './detalle-orden.controller';
import {OrdenesModule} from "../ordenes/ordenes.module";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],  // Registra la entidad DetalleOrden
    providers: [DetalleOrdenService], // Proveedor del servicio DetalleOrdenService
    exports: [DetalleOrdenService], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class DetalleOrdenModule {}
