import {Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe} from '@nestjs/common';
import {VehiculoService} from "./vehiculos.service";
import {Vehiculo} from "./entities/vehiculos.entity";


@Controller('vehiculos')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get()
    async findAll(): Promise<Vehiculo[]> {
        return this.vehiculoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
        return this.vehiculoService.findOne(id);
    }
}
