import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderDetail} from "./entities/orderDetail";
import {Order} from "../ordenes/entities/orden.entity";
import { DetalleOrdenService } from './detalle-orden.service';
import { DetalleOrdenController } from './detalle-orden.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail, Order])],
    providers: [DetalleOrdenService],
    controllers: [DetalleOrdenController],
})
export class DetalleOrdenModule {}
