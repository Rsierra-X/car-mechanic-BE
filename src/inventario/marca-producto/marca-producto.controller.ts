import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {MarcaProductoService} from "./marca-producto.service";
import {CreateMarcaProductoDto} from "../dto/create-marca-producto.dto";
import {UpdateMarcaProductoDto} from "../dto/update-marca-producto.dto";

@Controller('marcas')
export class MarcaProductoController {
    constructor(private readonly service: MarcaProductoService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    create(@Body() dto: CreateMarcaProductoDto) {
        return this.service.create(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        console.log('here')
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateMarcaProductoDto) {
        console.log('here')
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
