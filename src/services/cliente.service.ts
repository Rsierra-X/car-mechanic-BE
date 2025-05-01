import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
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


    async create(cliente: Partial<Cliente>): Promise<Cliente> {
        const nuevoCliente = this.clienteRepository.create(cliente);
        return this.clienteRepository.save(nuevoCliente);
    }

    async update(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
        await this.clienteRepository.update(id, cliente);
        const clienteFound = await this.clienteRepository.findOne({ where: { ClienteID: id } });
        if (!clienteFound) {
            throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
        }
        return clienteFound;
    }

    async delete(id: number): Promise<void> {
        await this.clienteRepository.delete(id);
    }
}