import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TipoProductoService} from "./tipo-producto.service";
import {CreateTipoProductoDto} from "../dto/create-tipo-producto.dto";
import {UpdateTipoProductoDto} from "../dto/update-tipo-producto.dto";

@Controller('tiposProductos')
export class TipoProductoController {
    constructor(private readonly service: TipoProductoService) {}

    @Post()
    create(@Body() dto: CreateTipoProductoDto) {
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
    update(@Param('id') id: number, @Body() dto: UpdateTipoProductoDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
