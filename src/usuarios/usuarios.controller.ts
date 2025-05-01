import {Body, Controller, Delete, Get, NotFoundException, Param, Put, UseGuards} from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    findAll() {
        return this.usuariosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const usuario = await this.usuariosService.findOne(id);
        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: any) {
        return this.usuariosService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usuariosService.remove(id);
    }
}
