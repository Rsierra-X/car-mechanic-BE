import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculos.entity';
import { VehiculoDto } from './dto/vehiculo.dto';

@Injectable()
export class VehiculosService {
    constructor(
        @InjectRepository(Vehiculo)
        private vehiculoRepo: Repository<Vehiculo>,
    ) {}

    findAll() {
        return this.vehiculoRepo.find({ relations: ['Cliente'] });
    }

    async findOne(id: number) {
        const vehiculo = await this.vehiculoRepo.findOne({ where: { VehiculoID: id }, relations: ['Cliente'] });
        if (!vehiculo) throw new NotFoundException(`Vehículo con ID ${id} no encontrado.`);
        return vehiculo;
    }

    create(data: VehiculoDto) {
        const vehiculo = this.vehiculoRepo.create(data);
        return this.vehiculoRepo.save(vehiculo);
    }

    async update(id: number, data: VehiculoDto) {
        await this.vehiculoRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        const vehiculo = await this.findOne(id);
        return this.vehiculoRepo.remove(vehiculo);
    }
}

