import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MarcaProducto} from "../entities/marca-producto.entity/marca-producto.entity";
import {Repository} from "typeorm";
import {CreateMarcaProductoDto} from "../dto/create-marca-producto.dto";
import {UpdateMarcaProductoDto} from "../dto/update-marca-producto.dto";

@Injectable()
export class MarcaProductoService {
    constructor(
        @InjectRepository(MarcaProducto)
        private readonly repo: Repository<MarcaProducto>
    ) {}

    create(dto: CreateMarcaProductoDto) {
        const marca = this.repo.create(dto);
        return this.repo.save(marca);
    }

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOneByOrFail({ id });
    }

    async update(id: number, dto: UpdateMarcaProductoDto) {
        const marca = await this.repo.preload({ id, nombre: dto.nombre, });
        if (!marca) throw new NotFoundException('Marca no encontrada');
        return this.repo.save(marca);
    }

    async remove(id: number) {
        const marca = await this.findOne(id);
        return this.repo.remove(marca);
    }
}
