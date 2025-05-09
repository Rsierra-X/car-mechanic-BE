import {BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {DetalleOrdenService} from "./detalle-orden.service";
import {CreateOrderDetailDto, UpdateOrderDetailDto} from "./dto/order-detail.dto";
import {OrderDetail} from "./entities/orderDetail";

@Controller('detalle-orden')
export class DetalleOrdenController {
    constructor(private readonly service: DetalleOrdenService) {}

    @Post()
    async create(@Body() dto: CreateOrderDetailDto): Promise<OrderDetail> {
        if ((dto.tipo === 'producto' && !dto.productoId) || (dto.tipo === 'servicio' && !dto.servicioId)) {
            throw new BadRequestException('Debe especificar el ID del producto o servicio según el tipo.');
        }
        return this.service.create(dto);
    }

    @Get()
    async findAll(): Promise<OrderDetail[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderDetail> {
        return this.service.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrderDetailDto
    ): Promise<OrderDetail> {
        if ((dto.tipo === 'producto' && !dto.productoId) || (dto.tipo === 'servicio' && !dto.servicioId)) {
            throw new BadRequestException('Debe especificar el ID del producto o servicio según el tipo.');
        }
        return this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.remove(id);
    }
}
