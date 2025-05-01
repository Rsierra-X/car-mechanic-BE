import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Orden} from "./entities/orden.entity";
import {Repository} from "typeorm";
import {OrdenDto} from "./dto/orden.dto";

@Injectable()
export class OrdenesService {
    constructor(
        @InjectRepository(Orden)
        private ordenRepository: Repository<Orden>,
    ) {}

    async findAll(): Promise<Orden[]> {
        return this.ordenRepository.find({ relations: ['Cliente', 'Vehiculo'] });
    }

    async findOne(id: number): Promise<Orden> {
        const orden = await this.ordenRepository.findOne({ where: { OrdenID: id }, relations: ['Cliente', 'Vehiculo'] });
        if (!orden) throw new NotFoundException(`Orden con ID ${id} no encontrada`);
        return orden;
    }

    async create(data: OrdenDto): Promise<Orden> {
        const orden = this.ordenRepository.create(data);
        return this.ordenRepository.save(orden);
    }

    async update(id: number, data: OrdenDto): Promise<Orden> {
        await this.ordenRepository.update(id, data);
        const updated = await this.findOne(id);
        return updated;
    }

    async delete(id: number): Promise<void> {
        await this.ordenRepository.delete(id);
    }
}
