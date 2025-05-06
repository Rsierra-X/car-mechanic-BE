import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderDetail} from "./entities/orderDetail";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
})
export class DetalleOrdenModule {}
