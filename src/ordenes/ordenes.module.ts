import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/orden.entity";
import {OrderService} from "./ordenes.service";
import {OrderController} from "./ordenes.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrdenesModule {}
