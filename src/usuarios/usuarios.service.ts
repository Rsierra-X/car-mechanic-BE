import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./entities/usuario.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { UsuarioID: id } });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }

    async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
        const usuario = await this.findOne(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        if (data.Contrasena) {
            const salt = await bcrypt.genSalt();
            data.Contrasena = await bcrypt.hash(data.Contrasena, salt);
        }

        await this.usuarioRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.usuarioRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Usuario no encontrado');
        }
    }
}
