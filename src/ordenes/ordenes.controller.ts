import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {OrdenesService} from "./ordenes.service";
import {OrdenDto} from "./dto/orden.dto";

@Controller('ordenes')
export class OrdenesController {
    constructor(private readonly ordenesService: OrdenesService) {}

    @Get()
    findAll() {
        return this.ordenesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordenesService.findOne(id);
    }

    @Post()
    create(@Body() dto: OrdenDto) {
        return this.ordenesService.create(dto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: OrdenDto) {
        return this.ordenesService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ordenesService.delete(id);
    }
}
