import {Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe} from '@nestjs/common';
import {VehiculoService} from "./vehiculos.service";
import {CreateVehiculoDTO, UpdateVehiculoDTO} from "./dto/vehiculo.dto";
import {Vehiculo} from "./entities/vehiculos.entity";


@Controller('vehiculos')
//@UseGuards(JwtAuthGuard)
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Post()
    async create(@Body() vehiculoDTO: CreateVehiculoDTO): Promise<Vehiculo> {
        return this.vehiculoService.create(vehiculoDTO);
    }

    @Get()
    async findAll(): Promise<Vehiculo[]> {
        return this.vehiculoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
        return this.vehiculoService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() vehiculoDTO: UpdateVehiculoDTO,
    ): Promise<Vehiculo> {
        return this.vehiculoService.update(id, vehiculoDTO);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.vehiculoService.remove(id);
    }
}
