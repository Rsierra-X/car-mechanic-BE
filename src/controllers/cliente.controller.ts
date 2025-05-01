import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
    constructor(private clienteService: ClienteService) {}

    @Get()
    async findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
        return this.clienteService.findOne(id);
    }

    @Post()
    async create(@Body() cliente: Partial<Cliente>): Promise<Cliente> {
        return this.clienteService.create(cliente);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() cliente: Partial<Cliente>): Promise<Cliente> {
        return this.clienteService.update(id, cliente);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.clienteService.delete(id);
    }
}