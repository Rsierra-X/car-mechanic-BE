import {Injectable, NotFoundException} from '@nestjs/common';
import {TipoProducto} from "../entities/tipo-producto.entity/tipo-producto.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTipoProductoDto} from "../dto/create-tipo-producto.dto";
import {UpdateTipoProductoDto} from "../dto/update-tipo-producto.dto";

@Injectable()
export class TipoProductoService {
    constructor(
        @InjectRepository(TipoProducto)
        private readonly repo: Repository<TipoProducto>
    ) {}

    create(dto: CreateTipoProductoDto) {
        const tipo = this.repo.create(dto);
        return this.repo.save(tipo);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneByOrFail({ id });
    }

    async update(id: number, dto: UpdateTipoProductoDto) {
        const tipo = await this.repo.findOneByOrFail({ id });

        if (!tipo) {
            throw new NotFoundException('Marca no encontrada');
        }

        Object.assign(tipo, dto);

        return this.repo.save(tipo);
    }

    async remove(id: number) {
        const tipo = await this.findOne(id);
        return this.repo.remove(tipo);
    }
}
