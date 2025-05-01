import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    ) {}

    async findAll(): Promise<Cliente[]> {
        return this.clienteRepository.find();
    }

    async findOne(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({ where: { ClienteID: id } });
        if (!cliente) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    }

    async create(data: Partial<Cliente>): Promise<Cliente> {
        const nuevo = this.clienteRepository.create(data);
        return this.clienteRepository.save(nuevo);
    }

    async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
        await this.clienteRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const result = await this.clienteRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
    }
}