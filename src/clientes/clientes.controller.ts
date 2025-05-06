import {Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';


@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Get()
    findAll(): Promise<Cliente[]> {
        return this.clientesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
        return this.clientesService.findOne(+id);
    }

    @Post()
    create(@Body() body: Partial<Cliente>): Promise<Cliente> {
        return this.clientesService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Cliente>): Promise<Cliente> {
        return this.clientesService.update(+id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.clientesService.delete(+id);
    }

    @Get('search')
    search(@Query('query') query: string): Promise<Cliente[]> {
        return this.clientesService.search(query);
    }
}