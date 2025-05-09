import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Producto} from "./entities/producto.entity";
import {InventarioService} from "./inventario.service";
import {InventarioController} from "./inventario.controller";
import { MarcaProductoModule } from './marca-producto/marca-producto.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';

@Module({
    imports: [TypeOrmModule.forFeature([Producto]), MarcaProductoModule, TipoProductoModule],
    controllers: [InventarioController],
    providers: [InventarioService],
    exports: [InventarioService],
})
export class InventarioModule {}
