import {Controller, Get, Post, Put, Delete, Param, Body, Query, Res, ParseIntPipe} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { Producto } from './entities/producto.entity';

@Controller('inventario')
export class InventarioController {
    constructor(private readonly inventarioService: InventarioService) { }

    @Get()
    findAll(): Promise<Producto[]> {
        return this.inventarioService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
        return this.inventarioService.findOne(+id);
    }

    @Post()
    create(@Body() body: Partial<Producto>): Promise<Producto> {
        return this.inventarioService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Producto>): Promise<Producto> {
        return this.inventarioService.update(+id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.inventarioService.delete(+id);
    }

    @Get('search')
    search(@Query('query') query: string): Promise<Producto[]> {
        return this.inventarioService.search(query);
    }

    @Get('export')
    exportarInventario(
        @Query('formato') formato: 'excel' | 'pdf',
        @Res() res: Response,
    ) {
        return this.inventarioService.exportarInventario(formato, res);
    }
}