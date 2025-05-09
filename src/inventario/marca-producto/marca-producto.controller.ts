import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {MarcaProductoService} from "./marca-producto.service";
import {CreateMarcaProductoDto} from "../dto/create-marca-producto.dto";
import {UpdateMarcaProductoDto} from "../dto/update-marca-producto.dto";

@Controller('inventario/marcas')
export class MarcaProductoController {
    constructor(private readonly service: MarcaProductoService) {}

    @Post()
    create(@Body() dto: CreateMarcaProductoDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateMarcaProductoDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
