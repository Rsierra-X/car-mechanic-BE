import {Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards, Patch} from '@nestjs/common';
import {OrderService} from "./ordenes.service";
import {CreateOrderDto} from "./dto/orden.dto";

@Controller('ordenes')
export class OrdersController {
    constructor(private readonly ordersService: OrderService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    async findAll() {
        return this.ordersService.findAll();
    }

    @Patch(':id/estado')
    async updateEstado(
        @Param('id', ParseIntPipe) id: number,
        @Body('estado') estado: string
    ) {
        return this.ordersService.updateEstado(id, estado);
    }
}
