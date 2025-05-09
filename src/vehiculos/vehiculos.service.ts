import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculos.entity';
import {CreateVehiculoDTO, UpdateVehiculoDTO} from "./dto/vehiculo.dto";

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(Vehiculo)
        private vehiculoRepository: Repository<Vehiculo>,
    ) {}

    async findAll(): Promise<Vehiculo[]> {
        return this.vehiculoRepository.find();
    }

    async findOne(id: number): Promise<Vehiculo> {
        return this.vehiculoRepository.findOneOrFail({
            where: { VehiculoID: id },
        });
    }

    async findOrCreate(dto: CreateVehiculoDTO & { ClienteID: number }): Promise<Vehiculo> {
        const { Placa, ClienteID } = dto;

        if (!Placa) {
            throw new BadRequestException('Debe proporcionar una placa para identificar el vehículo');
        }

        let vehiculo = await this.vehiculoRepository.findOne({
            where: { Placa, ClienteID },
        });

        if (!vehiculo) {
            vehiculo = this.vehiculoRepository.create(dto);
            vehiculo = await this.vehiculoRepository.save(vehiculo);
        }

        return vehiculo;
    }
}

