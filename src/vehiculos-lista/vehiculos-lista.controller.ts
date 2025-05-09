import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {VehiculosListaService} from "./vehiculos-lista.service";
import {CreateVehiculosListaDto} from "./dto/create-vehiculos-lista.dto";
import {UpdateVehiculosListaDto} from "./dto/update-vehiculos-lista.dto";

@Controller('vehiculos-lista')
export class VehiculosListaController {
    constructor(private readonly service: VehiculosListaService) {}

    @Post()
    create(@Body() dto: CreateVehiculosListaDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('marca/:marca')
    findByMarca(@Param('marca') marca: string) {
        return this.service.findByMarca(marca);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateVehiculosListaDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
