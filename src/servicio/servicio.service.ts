import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Servicio} from "./entities/servicio.entity";
import {Repository} from "typeorm";
import {CreateServicioDto} from "./dto/create-servicio.dto";
import {UpdateServicioDto} from "./dto/update-servicio.dto";

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepo: Repository<Servicio>,
    ) {}

    async create(dto: CreateServicioDto): Promise<Servicio> {
        const servicio = this.servicioRepo.create(dto);
        return this.servicioRepo.save(servicio);
    }

    async findAll(): Promise<Servicio[]> {
        return this.servicioRepo.find();
    }

    async findOne(id: number): Promise<Servicio> {
        return this.servicioRepo.findOne({ where: { ServicioID: id } });
    }

    async update(id: number, dto: UpdateServicioDto): Promise<Servicio> {
        const servicio = await this.servicioRepo.preload({
            ServicioID: id,
            ...dto
        });
        if (!servicio) throw new Error('Servicio no encontrado');
        return this.servicioRepo.save(servicio);
    }

    async remove(id: number): Promise<void> {
        const servicio = await this.servicioRepo.findOne({ where: { ServicioID: id } });
        if (!servicio) throw new Error('Servicio no encontrado');
        await this.servicioRepo.remove(servicio);
    }
}
