import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculoDto } from './dto/vehiculo.dto';

@Controller('vehiculos')
export class VehiculosController {
    constructor(private readonly vehiculosService: VehiculosService) {}

    @Get()
    findAll() {
        return this.vehiculosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehiculosService.findOne(+id);
    }

    @Post()
    create(@Body() dto: VehiculoDto) {
        return this.vehiculosService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: VehiculoDto) {
        return this.vehiculosService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehiculosService.remove(+id);
    }
}
