import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Producto} from "./entities/producto.entity";
import {InventarioService} from "./inventario.service";
import {InventarioController} from "./inventario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Producto])],
    controllers: [InventarioController],
    providers: [InventarioService],
    exports: [InventarioService],
})
export class InventarioModule {}
