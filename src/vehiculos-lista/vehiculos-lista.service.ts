import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoLista } from './entities/vehiculo-lista.entity';
import vehiculosData from './vehiculos-lista.json';
import {CreateVehiculosListaDto} from "./dto/create-vehiculos-lista.dto";
import {UpdateVehiculosListaDto} from "./dto/update-vehiculos-lista.dto";

@Injectable()
export class VehiculosListaService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(VehiculoLista)
        private vehiculoListaRepo: Repository<VehiculoLista>,
    ) {}

    async onApplicationBootstrap() {
        const count = await this.vehiculoListaRepo.count();
        if (count === 0) {
            await this.vehiculoListaRepo.save(vehiculosData);
            console.log('Vehículos de catálogo insertados correctamente.');
        }
    }

    create(dto: CreateVehiculosListaDto) {
        const nuevo = this.vehiculoListaRepo.create(dto);
        return this.vehiculoListaRepo.save(nuevo);
    }

    findAll() {
        return this.vehiculoListaRepo.find();
    }

    findByMarca(marca: string) {
        return this.vehiculoListaRepo.find({ where: { marca } });
    }

    update(id: number, dto: UpdateVehiculosListaDto) {
        return this.vehiculoListaRepo.update(id, dto);
    }

    remove(id: number) {
        return this.vehiculoListaRepo.delete(id);
    }
}
