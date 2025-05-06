import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculos.entity';
import {CreateVehiculoDTO, UpdateVehiculoDTO} from "./dto/vehiculo.dto";

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
    ) { }

    async create(vehiculoDTO: CreateVehiculoDTO): Promise<Vehiculo> {
        const vehiculo = this.vehiculoRepository.create(vehiculoDTO);
        return this.vehiculoRepository.save(vehiculo);
    }

    async findAll(): Promise<Vehiculo[]> {
        return this.vehiculoRepository.find();
    }

    async findOne(id: number): Promise<Vehiculo> {
        return this.vehiculoRepository.findOneOrFail({
            where: { VehiculoID: id },
        });
    }

    async update(id: number, vehiculoDTO: UpdateVehiculoDTO): Promise<Vehiculo> {
        const existingVehiculo = await this.vehiculoRepository.findOneOrFail({ where: { VehiculoID: id } });
        this.vehiculoRepository.merge(existingVehiculo, vehiculoDTO);
        return this.vehiculoRepository.save(existingVehiculo);
    }

    async remove(id: number): Promise<void> {
        const vehiculo = await this.vehiculoRepository.findOneOrFail({ where: { VehiculoID: id } });
        await this.vehiculoRepository.remove(vehiculo);
    }
}

